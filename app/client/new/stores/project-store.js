import mobx, { action, computed, observable } from 'mobx'
import _ from 'lodash'
import { isPromise, inGroupsOf, pluralize } from '../../utils/utils';
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
    this.projects.set(model.id, model)
  }


  @computed get all(){
    return this.projects.values()
  }


  comparator(a, b){
    if (a.name > b.name){ return 1 }
    if (a.name < b.name){ return -1 }
    return 0
  }


  sort(list){
    return list.sort(this.comparator)
  }


  @computed get sorted(){
    return this.sort(this.all)
  }


  get(...args){
    if(args.length < 3){ throw('At least 3 arguments are required for get: model type, params, fields.') }
    let options
    if(args.length % 3 != 0){ options = args.pop() }
    let requests = inGroupsOf(args, 3)

    let cached = this.app.gqlStore.checkQueryCache(requests)
    if(!cached){ return null }

    if(requests.length > 1){
      return processGetRequests(this.projects, requests)
    } else {
      return processGetRequest(this.projects, requests[0])
    }
  }


  load(...args){
    if(args.length < 3){ throw('At least 3 arguments are required for load: model type, params, fields.') }
    let options
    if(args.length % 3 != 0){ options = args.pop() }
    let requests = inGroupsOf(args, 3)

    app.gqlStore.loadData(app, requests)
  }


  fetch(...args){
    let found = this.get(...args)
    if(!found){ found = this.load(...args) }
    return found
  }


  create({name} = {}){
    let gql = 'mutation createProject($name: String!){createProject(input: {name: $name}){ project{ id, name } }}'
    return app.gqlStore.mutateData(this.app, gql, {name: name})
  }


  update({name, id} = {}){
    let gql = 'mutation updateProject($name: String!, $id: ID!){updateProject(input: {name: $name, id: $id}){ project{ id, name, createdAt } }}'
    return app.gqlStore.mutateData(this.app, gql, {name: name, id: id})
  }


  delete({id} = {}){
    let gql = 'mutation delete($id: ID!, $type: String!){delete(input: {id: $id, type: $type}){ type, id }}'
    return app.gqlStore.deleteData(this.app, gql, {id: id, type: 'Project'})
  }


  _delete(id) {
    this.projects.delete(id)
  }




}




function hasAllProperties(model, fields){
  return _.every(fields, (field)=>{ return model[field] !== undefined })
}


function processGetRequests(collection, requests){
  responses = null
  requests.forEach((request)=>{
    response = processGetRequest(collection, request)

    if(response){
      if(responses === null){ responses = [] }
      responses.push(response)
    }

    return responses
  })
}


function processGetRequest(collection, request){
  let modelName = request[0].toLowerCase()
  let params = request[1]
  let fields = request[2]

  if(params.id){
    //let found = this[pluralize(modelName)].get(params.id)
    let found = collection.get(params.id)
    return (found && hasAllProperties(found, fields)) ? found : null
  } else {
    return find(collection, params, fields)
  }
}


function find(collection, params, fields=[]){
  let found = []
  collection.forEach((value, key)=>{
    let match = _.every(Object.keys(params), (paramKey)=>{
      return value[paramKey] === params[paramKey]
    })
    if(match && hasAllProperties(value, fields)){ found.push(value) }
  })
  return found
}