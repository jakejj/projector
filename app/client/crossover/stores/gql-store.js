import _ from 'lodash'
import mobx, { action, computed, observable, extendObservable } from 'mobx'
import { singularize, compareObjects, compareArrays } from '../../utils/utils'


export default class GqlStore {
  @observable queryCache = []

  loadData(app, requests){
    let gql = toGql(requests)
    let resultPromise = executeGqlQuery(app.settings.api, app.settings.gqlUrl, gql)
    return resultPromise.then((results)=>{
      parseGqlQueryResults(app, results.data)
      addQueriesToCache(this.queryCache, requests)
    })
  }

  deleteData(app, gqlMutation, variables) {
    let resultPromise = executeGqlQuery(app.settings.api, app.settings.gqlUrl, gqlMutation, variables)
    return resultPromise.then((results)=>{
      if (!results.errors) {
        deleteStoreData(app, variables.type, variables.id)
        return {success: true}
      }
      return results
    })
  }

  mutateData(app, gqlMutation, variables){
    return executeGqlMutation(app, app.settings.api, app.settings.gqlUrl, gqlMutation, variables)
  }

  checkQueryCache(requests){
    if(Array.isArray(requests) && typeof requests[0] !== 'string' ){
      return _.every(requests, (request)=>{
        return hasQueryCacheItem(this.queryCache, request) })
    } else {
      return hasQueryCacheItem(this.queryCache, requests)
    }
  }

}







function addQueriesToCache(queryCache, requests){
  requests.forEach((query)=>{
    if(!hasQueryCacheItem(queryCache, query)){ queryCache.push(query) }
  })
}

function deleteStoreData(app, type, id) {
  let storeName = singularize(type).toLowerCase() + 'Store'
  app.stores[storeName]._delete(id)
}


function parseGqlQueryResultsHelper(app, data){
  Object.keys(data).forEach((key)=>{
    let value = data[key]
    let storeName = singularize(key) + 'Store'
    if (!app.stores[storeName]) {
      return parseGqlQueryResultsHelper(app, value)
    }

    if(Array.isArray(value)){
      value.forEach((val)=>{
        app.stores[storeName].add(val)
      })
    } else {
      app.stores[storeName].add(value)
    }
  })
}

const parseGqlQueryResults = mobx.action('Import Models', function parseGqlQueryResults(app, results){
  let data = results.data
  let errors = results.errors

  data && parseGqlQueryResultsHelper(app, data)

  errors = (errors && errors.map((error) => {
    return error
  }))
  return {errors: errors, success: !!!errors}
})

function hasQueryCacheItem(queryCache, request){
  return _.some(queryCache, (cachedQuery)=>{ return compareRequests(request, cachedQuery) })
}


function compareRequests(request, cached){
  return request[0] === cached[0] && compareObjects(request[1], cached[1]) && areArrayValuesContained(request[2], cached[2]) ? true : false
}


function areArrayValuesContained(array, containedByArray){
  return _.every(array, (value)=>{ return _.some(containedByArray, (containedByArrayValue)=>{ return value === containedByArrayValue }) })
}


function toGql(requests, operationType='query'){
  let gqlQuery = operationType + ' {\n'
  gqlQuery += requests.map((request)=>{
    return makeQuery(request)
  }).join(', \n')
  gqlQuery += '\n }'
  return gqlQuery
}


function makeQuery(request){
  let modelName = request[0].toLowerCase()
  let params = request[1]
  let fields = request[2]
  if(!_.includes(fields, 'id')){ fields.push('id') }

  let str = modelName
  if(params && Object.keys(params).length > 0){
    str += '(' + Object.keys(params).map((key)=>{ return key + ': ' + params[key] }) + ')'
  }
  str += '{' + fields.join(', ') + '}'
  return str
}


function executeGqlQuery(api, url, gqlQuery, variables={}){
  return api.post(url, {query: gqlQuery, variables: variables})
}


function executeGqlMutation(app, api, url, gqlMutation, variables){
  let resultPromise = executeGqlQuery(api, url, gqlMutation, variables)
  return resultPromise.then((results)=>{
    return parseGqlQueryResults(app, results.data)
  })
}
