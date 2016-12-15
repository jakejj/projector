import _ from 'lodash'
import mobx, { action, computed, observable, extendObservable } from 'mobx'
import { singularize, compareObjects, compareArrays } from '../utils/utils'


export default {

  queryCache: observable([]),


  loadFromGql: function(app, requests){
    let gql = this.toGql(requests)
    let resultPromise = this.executeGqlQuery(app.api, app.gqlUrl, gql)
    return resultPromise.then((results)=>{
      this.parseGqlQueryResults(app, results.data)
      this.addQueriesToCache(requests)
    })
  },


  addQueriesToCache: function(requests){
    requests.forEach((query)=>{
      if(!this.hasQueryCacheItem(query)){ this.queryCache.push(query) }
    })
  },


  checkQueryCache: function(requests){
    if(Array.isArray(requests) && typeof requests[0] !== 'string' ){
      return _.every(requests, (request)=>{ 
        return this.hasQueryCacheItem(request) })
    } else {
      return this.hasQueryCacheItem(requests)
    }
  },


  hasQueryCacheItem: function(request){
    return _.some(this.queryCache, (cachedQuery)=>{ return this.compareRequests(request, cachedQuery) })
  },


  compareRequests(request, cached){
    return request[0] === cached[0] && compareObjects(request[1], cached[1]) && this.areArrayValuesContained(request[2], cached[2]) ? true : false
  },


  areArrayValuesContained(array, containedByArray){
    return _.every(array, (value)=>{ return _.some(containedByArray, (containedByArrayValue)=>{ return value === containedByArrayValue }) })
  },


  toGql: function(requests, operationType='query'){
    let gqlQuery = operationType + ' {\n'
    gqlQuery += requests.map((request)=>{
      return this.makeQuery(request)
    }).join(', \n')
    gqlQuery += '\n }'
    return gqlQuery
  },


  makeQuery: function(request){
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
  },


  executeGqlQuery: function(api, url, gqlQuery){
    return api.post(url, {query: gqlQuery})
  },


  @mobx.action('Import Models') parseGqlQueryResults: function(app, results){
    let data = results.data
    let errors = results.errors
    
    Object.keys(data).forEach((key)=>{
      let value = data[key]
      let storeName = singularize(key) + 'Store'
      
      if(Array.isArray(value)){
        value.forEach((val)=>{
          app[storeName].add(val)
        })
      } else {
        app[storeName].add(value)
      }
    })
  },








  mutateData(app, gqlMutation, variables){
    this.executeGqlMutation(app.api, app.gqlUrl, gqlMutation, variables)
  },


  executeGqlMutation: function(api, url, gqlMutation, variables){
    return api.post(url, {query: gqlMutation, variables: variables})
    let resultPromise = this.executeGqlQuery(app.api, app.gqlUrl, gql)
    return resultPromise.then((results)=>{
      this.parseGqlQueryResults(app, results.data)
      this.addQueriesToCache(requests)
    })
  }



}