import _ from 'lodash'

export default {
  
  loadFromGql: function(app, request){
    let gql = this.toGql(request)
    let resultPromise = this.executeGqlQuery(app.api, app.gqlUrl, gql)
    resultPromise.then((results)=>{
      this.parseGqlQueryResults(results.data)
    })
  },

  toGql: function(arrayOrObj, operationType='query'){
    let gqlQuery = operationType + ' {\n'
    if(Array.isArray(arrayOrObj)){
      gqlQuery += arrayOrObj.map((obj)=>{
        return this.makeQuery(obj)
      }).join(', \n')
    } else {
      gqlQuery += this.makeQuery(arrayOrObj)
    }
    gqlQuery += '\n }'
    return gqlQuery
  },


  makeQuery: function(obj){
    let str = obj.type.toLowerCase()
    if(obj.params && Object.keys(obj.params).length > 0){
      str += '(' + Object.keys(obj.params).map((key)=>{ return key + ': ' + obj.params[key] }) + ')'
    }
    str += '{' + obj.fields.join(', ') + '}'
    return str
  },


  executeGqlQuery: function(api, url, gqlQuery){
    return api.post(url, {query: gqlQuery})
  },


  parseGqlQueryResults: function(data){
    Object.keys(data).forEach((key)=>{
      let value = data[key]
      let modelType = _.capitalize(key)
      let storeName = 
      app[]
    })
    
    console.log(data)
  },


  getQuery: function(){
    return [
      {
        type: 'Project',
        params: { id: '1' },
        fields: ['id, name, createdAt']
      }, 
      {
        type: 'Tasks',
        params: { projectId: '1' },
        fields: ['id, name, createdAt']
      }, 
    ]
  },

}