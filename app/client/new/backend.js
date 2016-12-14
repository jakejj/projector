import _ from 'lodash'
import mobx, { action, computed, observable, extendObservable } from 'mobx'
import { singularize, compareObjects, compareArrays } from '../utils/utils'


export default {
  
  queryCache: observable([]),
  
  loadFromGql: function(app, requests){
    let gql = this.toGql(requests)
    let resultPromise = this.executeGqlQuery(app.api, app.gqlUrl, gql)
    resultPromise.then((results)=>{
      this.addQueriesToCache(requests)
      this.parseGqlQueryResults(app, results.data)
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
    
    //let gqlQuery = operationType + ' {\n'
    //if(Array.isArray(arrayOrObj)){
    //  gqlQuery += arrayOrObj.map((obj)=>{
    //    return this.makeQuery(obj)
    //  }).join(', \n')
    //} else {
    //  gqlQuery += this.makeQuery(arrayOrObj)
    //}
    //gqlQuery += '\n }'
    //return gqlQuery
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
    

//    let str = obj.type.toLowerCase()
//    if(obj.params && Object.keys(obj.params).length > 0){
//      str += '(' + Object.keys(obj.params).map((key)=>{ return key + ': ' + obj.params[key] }) + ')'
//    }
//    str += '{' + obj.fields.join(', ') + '}'
//    return str
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


  getQuery: function(){
    return [['Project', { id: '1' }, ['id, name, createdAt']]]
    
    //return [
    //  {
    //    type: 'Project',
    //    params: { id: '1' },
    //    fields: ['id, name, createdAt']
    //  }, 
    //  //{
    //  //  type: 'Tasks',
    //  //  params: { projectId: '1' },
    //  //  fields: ['id, name, createdAt']
    //  //}, 
    //]
  },

}