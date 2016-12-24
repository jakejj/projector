import mobx, { action, computed, observable, extendObservable } from 'mobx'
import _ from 'lodash'
import { reduce } from 'lodash/fp'
import { camelizeObject, decamelizeObject, isPromise, inGroupsOf, pluralize } from '../../utils/utils';

import ProjectModel from './project-model'


export default class ProjectStore {
  @observable projects = mobx.map({})
  @observable listLoaded = false


  constructor(app, { api } = {}){
    this.app = app
    this.api = api
    this.loadedRequests = []
  }

  @computed get serialize() {
    let { app, api, ...rest } = this
    return JSON.stringify(rest)
  }


  @action('addProject') add(model){
    //let existingModel = this.projects.get(model.id)
    //if(existingModel){
    //  existingModel.createdAt = model.createdAt
    //} else {
    this.projects.set(model.id, model)
    //}
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








  hasAllProperties(model, fields){
    return _.every(fields, (field)=>{ return model[field] !== undefined })
  }


  find(params, fields=[]){
    let found = []
    this.projects.forEach((value, key)=>{
      let match = _.every(Object.keys(params), (paramKey)=>{
        return value[paramKey] === params[paramKey]
      })
      if(match && this.hasAllProperties(value, fields)){ found.push(value) }
    })
    return found
  }


  processGetRequest(request){
    let modelName = request[0].toLowerCase()
    let params = request[1]
    let fields = request[2]

    if(params.id){
      let found = this[pluralize(modelName)].get(params.id)
      return (found && this.hasAllProperties(found, fields)) ? found : null
    } else {
      return this.find(params, fields)
    }
  }


  // Options:
  //   {bypassCache: true}
  get(...args){
    if(args.length < 3){ throw('At least 3 arguments are required for get: model type, params, fields.') }
    let options
    if(args.length % 3 != 0){ options = args.pop() }
    let requests = inGroupsOf(args, 3)
    let cached = this.app.gqlStore.checkQueryCache(requests)
    if(!cached){ return null }

    if(requests.length > 1){
      responses = null
      requests.forEach((request)=>{
        response = this.processGetRequest(request)

        if(response){
          if(responses === null){ responses = [] }
          responses.push(response)
        }

        return responses
      })
    } else {
      return this.processGetRequest(requests[0])
    }

  }


  load(...args){
    if(args.length < 3){ throw('At least 3 arguments are required for load: model type, params, fields.') }
    let options
    if(args.length % 3 != 0){ options = args.pop() }
    let requests = inGroupsOf(args, 3)

    app.gqlStore.loadData(app, requests)
  }


  // Options:
  //
  // returnPromise - returns a promise if an the request hasn't been fulfilled yet
  // alwaysReturnPromise - Not implemented yet - always returns a promise that will either
  //    resolive immediately or
  //    when the request is fulfilled if it hasn't been fulfilled yet.
  fetch(...args){
    let found = this.get(...args)
    if(!found){ found = this.load(...args) }

    //if(options isPromise(found)){
    //
    //}

    return found
  }


  createProject({name} = {}){
    let gql = 'mutation createProject($name: String!){createProject(input: {name: $name}){ project{ id, name } }}'
    return app.gqlStore.mutateData(this.app, gql, {name: name})
  }

  updateProject({name, id} = {}){
    let gql = 'mutation updateProject($name: String!, $id: ID!){updateProject(input: {name: $name, id: $id}){ project{ id, name, createdAt } }}'
    return app.gqlStore.mutateData(this.app, gql, {name: name, id: id})
  }

















  @action('loadProjects') restLoad(options={}){
    if(options.id){
      return this.loadOne(options)
    } else {
      return this.loadMany(options)
    }
  }


  restLoad(options){
    if(options.id){
      return this.restLoadOne(options)
    } else {
      return this.restLoadMany(options)
    }
  }

  restLoadOne(options){
    let url = '/api/projects/'+options.id+'.json'
    if(options.query){ url = url + makeUrlQueryString(options.query) }

    this.api.get(url).then(action('importProject', (response)=>{
      let model = new ProjectModel(this.app, response.data)
      this.add(model)
    }))
  }


  restLoadMany(options){
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


  restGet(options){
    if(options.id){
      return this.restGetOne(options)
    } else {
      return this.restGetMany(options)
    }
  }


  restGetOne(options){
    options.model = this.projects.get(options.id)
    if(!options.model){ return false }
    if(this.hasAllProperties(options)){
      return options.model
    }
    return false
  }


  //TODO finish this so it actually returns the result of the request
  restGetMany(options){
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


  restFetch(request, options){
    let found = this.restGet(options)
    if(!found){ found = this.restLoad(options) }
    return found
  }


  restHasAllProperties({model, props = []} = {}){
    if(!model){ throw('hasAllProperties must be called with a model.') }
    if(props.length > 0){
      // Returns false if at least one required property doesn't exist
      return !props.some((property)=>{ return( model[property] === undefined ) })
    }
    return true
  }

  restUpdate(model, values){
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
}




function makeUrlQueryString(query){
  query = decamelizeObject(query)
  if(Object.keys(query).length == 0){ return '' }

  return reduce((queryString, key) => {
    if(queryString != '?'){ queryString = queryString + '&'}
    queryString = queryString + key + '=' + query[key]
    return queryString
  }, '?', Object.keys(query))
}
