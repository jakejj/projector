//function makeUrlQueryString(query){
//  query = decamelizeObject(query)
//  if(Object.keys(query).length == 0){ return '' }
//
//  return reduce((queryString, key) => {
//    if(queryString != '?'){ queryString = queryString + '&'}
//    queryString = queryString + key + '=' + query[key]
//    return queryString
//  }, '?', Object.keys(query))
//}
//
//
//@action('loadProjects') restLoad(options={}){
//  if(options.id){
//    return this.loadOne(options)
//  } else {
//    return this.loadMany(options)
//  }
//}
//
//
//restLoad(options){
//  if(options.id){
//    return this.restLoadOne(options)
//  } else {
//    return this.restLoadMany(options)
//  }
//}
//
//restLoadOne(options){
//  let url = '/api/projects/'+options.id+'.json'
//  if(options.query){ url = url + makeUrlQueryString(options.query) }
//
//  this.api.get(url).then(action('importProject', (response)=>{
//    let model = new ProjectModel(this.app, response.data)
//    this.add(model)
//  }))
//}
//
//
//restLoadMany(options){
//  let url = '/api/projects.json'
//  let app = this.app
//  if(options.query){ url = url + makeUrlQueryString(options.query) }
//
//  return this.api.get(url).then(action('importProjects', (response)=>{
//    response.data.forEach((modelData)=>{
//      let model = new ProjectModel(app, modelData)
//      this.add(model)
//    })
//
//    this.listLoaded = true
//    this.loadedRequest(options)
//  }))
//}
//
//
//restGet(options){
//  if(options.id){
//    return this.restGetOne(options)
//  } else {
//    return this.restGetMany(options)
//  }
//}
//
//
//restGetOne(options){
//  options.model = this.projects.get(options.id)
//  if(!options.model){ return false }
//  if(this._hasAllProperties(options)){
//    return options.model
//  }
//  return false
//}
//
//
////TODO finish this so it actually returns the result of the request
//restGetMany(options){
//  if(this.hasLoadedRequest(options)){
//    return this.projects.values()
//  }
//}
//
//
//hasLoadedRequest(options){
//  return this.loadedRequests.some((query)=>{ return _.isEqual(query, options) })
//}
//
//
//loadedRequest(options){
//  if(!this.hasLoadedRequest(options)){
//    this.loadedRequests.push(options)
//  }
//}
//
//
//restFetch(request, options){
//  let found = this.restGet(options)
//  if(!found){ found = this.restLoad(options) }
//  return found
//}
//
//
//restHasAllProperties({model, props = []} = {}){
//  if(!model){ throw('hasAllProperties must be called with a model.') }
//  if(props.length > 0){
//    // Returns false if at least one required property doesn't exist
//    return !props.some((property)=>{ return( model[property] === undefined ) })
//  }
//  return true
//}
//
//restUpdate(model, values){
//  let url = '/api/projects/'+model.id+'.json'
//  model = _.merge(model, values)
//
//  let payload = mobx.toJS(model)
//  payload.app = undefined
//
//  return app.api.put(url, payload)
//  .then((response) => {
//    return response
//  })
//  .catch((response) => {
//    console.log('Error updating model')
//    console.log(response)
//    throw response
//  })
//}
//
//find(params, fields=[]){
//  let found = []
//  this.projects.forEach((value, key)=>{
//    let match = _.every(Object.keys(params), (paramKey)=>{
//      return value[paramKey] === params[paramKey]
//    })
//    if(match && this.hasAllProperties(value, fields)){ found.push(value) }
//  })
//  return found
//}
