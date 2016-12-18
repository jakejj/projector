import _ from 'lodash'
import mobx, { action, computed, observable, extendObservable } from 'mobx'
import { singularize, compareObjects, compareArrays } from '../../utils/utils'


export default class GqlStore {
  @observable queryCache = []


  addQueriesToCache(requests){
    requests.forEach((query)=>{
      if(!this.hasQueryCacheItem(query)){ this.queryCache.push(query) }
    })
  }


  checkQueryCache(requests){
    if(Array.isArray(requests) && typeof requests[0] !== 'string' ){
      return _.every(requests, (request)=>{
        return this.hasQueryCacheItem(request) })
    } else {
      return this.hasQueryCacheItem(requests)
    }
  }


  loadData(app, requests){
    let gql = this.toGql(requests)
    let resultPromise = this.executeGqlQuery(app.api, app.gqlUrl, gql)
    return resultPromise.then((results)=>{
      this.parseGqlQueryResults(app, results.data)
      this.addQueriesToCache(requests)
    })
  }


  parseGqlQueryResultsHelper(app, data){
    Object.keys(data).forEach((key)=>{
      let value = data[key]
      let storeName = singularize(key) + 'Store'
      if (!app[storeName]) {
        return this.parseGqlQueryResultsHelper(app, value)
      }

      if(Array.isArray(value)){
        value.forEach((val)=>{
          app[storeName].add(val)
        })
      } else {
        app[storeName].add(value)
      }
    })
  }


  @mobx.action('Import Models') parseGqlQueryResults(app, results){
    let data = results.data
    let errors = results.errors

    data && this.parseGqlQueryResultsHelper(app, data)

    errors = (errors && errors.map((error) => {
      return error
    }))
    return {errors: errors, success: !!!errors}
  }


  mutateData(app, gqlMutation, variables){
    return this.executeGqlMutation(app.api, app.gqlUrl, gqlMutation, variables)
  }


  hasQueryCacheItem(request){
    return _.some(this.queryCache, (cachedQuery)=>{ return this.compareRequests(request, cachedQuery) })
  }


  compareRequests(request, cached){
    return request[0] === cached[0] && compareObjects(request[1], cached[1]) && this.areArrayValuesContained(request[2], cached[2]) ? true : false
  }


  areArrayValuesContained(array, containedByArray){
    return _.every(array, (value)=>{ return _.some(containedByArray, (containedByArrayValue)=>{ return value === containedByArrayValue }) })
  }


  toGql(requests, operationType='query'){
    let gqlQuery = operationType + ' {\n'
    gqlQuery += requests.map((request)=>{
      return this.makeQuery(request)
    }).join(', \n')
    gqlQuery += '\n }'
    return gqlQuery
  }


  makeQuery(request){
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


  executeGqlQuery(api, url, gqlQuery, variables={}){
    return api.post(url, {query: gqlQuery, variables: variables})
  }


  executeGqlMutation(api, url, gqlMutation, variables){
    let resultPromise = this.executeGqlQuery(api, url, gqlMutation, variables)
    return resultPromise.then((results)=>{
      return this.parseGqlQueryResults(app, results.data)
    })
  }

}
