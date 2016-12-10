import mobx, { action, computed, observable, extendObservable } from 'mobx'
import _ from 'lodash'
import { reduce } from 'lodash/fp'
import { camelizeObject, decamelizeObject, isPromise } from '../../utils/utils';

import ProjectModel from './project-model'


function makeUrlQueryString(query){
  query = decamelizeObject(query)
  if(Object.keys(query).length == 0){ return '' }

  return reduce((queryString, key) => {
    if(queryString != '?'){ queryString = queryString + '&'}
    queryString = queryString + key + '=' + query[key]
    return queryString
  }, '?', Object.keys(query))
}


export default class ProjectStore {
  @observable projects = mobx.map({})
  @observable listLoaded = false


  constructor(app, { api } = {}){
    this.app = app
    this.api = api
    this.loadedRequests = []
  }


  @action('loadProjects') load(options={}){
    if(options.id){
      return this.loadOne(options)
    } else { 
      return this.loadMany(options)
    }
  }




  update(model, values){
    let url = '/api/projects/'+model.id+'.json'
    model = _.merge(model, values)
    
    let payload = mobx.toJS(model)
    payload.app = undefined

    return app.api.put(url, payload)
    .then((response) => {
      return response
    })
    .catch((response) => {
      console.log('Error updating model')
      console.log(response)
      throw response
    })
  }


  @action('addProject') add(model){
//    let existingModel = this.projects.get(model.id)
//console.log('existing', existingModel)
//console.log('new', model)
//    if(existingModel){
//      //_.merge(existingModel, model)
//console.log('updating')
//console.log(existingModel.createdAt)
//      existingModel.createdAt = model.createdAt
//console.log(existingModel.createdAt)
//    } else {
//console.log('adding')
      this.projects.set(model.id, model)
//    }
  }


  @computed get all(){
    return this.projects.values()
  }


  sorted(year){
    return this.all().sort(this.comparator)
  }


  comparator(a, b){
    if (a.name > b.name){ return 1 }
    if (a.name < b.name){ return -1 }
    return 0
  }
















  load(options){
    app.backend.loadFromGql(app, app.backend.getQuery())
    
    
    
    //if(options.id){
    //  return this.loadOne(options)
    //} else {
    //  return this.loadMany(options)
    //}
  }


  loadOne(options){
    let url = '/api/projects/'+options.id+'.json'
    if(options.query){ url = url + makeUrlQueryString(options.query) }

    this.api.get(url).then(action('importProject', (response)=>{
      let model = new ProjectModel(this.app, response.data)
      this.add(model)
    }))
  }


  loadMany(options){
    let url = '/api/projects.json'
    let app = this.app
    if(options.query){ url = url + makeUrlQueryString(options.query) }

    return this.api.get(url).then(action('importProjects', (response)=>{
      response.data.forEach((modelData)=>{
        let model = new ProjectModel(app, modelData)
        this.add(model)
      })

      this.listLoaded = true
      this.loadedRequest(options)
    }))
  }


  hasAllProperties({model, props = []} = {}){
    if(!model){ throw('hasAllProperties must be called with a model.') }
    if(props.length > 0){
      // Returns false if at least one required property doesn't exist
      return !props.some((property)=>{ return( model[property] === undefined ) })
    }
    return true
  }


  get(options){
    if(options.id){
      return this.getOne(options)
    } else {
      return this.getMany(options)
    }
  }


  getOne(options){
    options.model = this.projects.get(options.id)
    if(!options.model){ return false }
    if(this.hasAllProperties(options)){
      return options.model
    }
    return false
  }


  //TODO finish this so it actually returns the result of the request
  getMany(options){
    if(this.hasLoadedRequest(options)){
      return this.projects.values()
    }
  }


  hasLoadedRequest(options){
    return this.loadedRequests.some((query)=>{ return _.isEqual(query, options) })
  }


  loadedRequest(options){
    if(!this.hasLoadedRequest(options)){
      this.loadedRequests.push(options)
    }
  }


  // Options:
  //
  // returnPromise - returns a promise if an the request hasn't been fulfilled yet
  // alwaysReturnPromise - Not implemented yet - always returns a promise that will either 
  //    resolive immediately or 
  //    when the request is fulfilled if it hasn't been fulfilled yet.
  fetch(options){
    let found
    found = this.get(options)
    if(!found){ found = this.load(options) }

    //if(options isPromise(found)){
    //  
    //}
    
    return found
  }












}