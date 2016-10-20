import mobx, { action, computed, observable, extendObservable } from 'mobx'
import _ from 'lodash'
import { reduce } from 'lodash/fp'
import { camelizeObject, decamelizeObject } from '../../utils/utils';

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
  }


  @action('loadProjects') load(options={}){
    if(options.id){
      return this.loadOne(options)
    } else { 
      return this.loadMany(options)
    }
  }


  loadOne(options){
    let url = '/api/projects/'+options.id+'.json'

    if(options.query){ url = url + makeUrlQueryString(options.query) }

    return this.api.get(url).then(action('importProject', (response)=>{
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
    }))
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
    this.projects.set(model.id, model)
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


  isLoaded({id, model, year, props = []} = {}){
    if(!id && !model){ throw('isLoaded must be called with an id or a model.') }

    if(id){ model = this.getVessel(id, year) }
    if(model === undefined){ return false }

    if(props.length > 0){
      let hasAllProps = !props.some((property)=>{ return( model[property] === undefined ) })
      return hasAllProps
    }
    
    return true
  }


  get(options){
    options.model = this.projects.get(options.id)
    if(!options.model){ return false }
    options.id = undefined

    if(this.isLoaded(options)){
      return options.model
    }
    return false
  }

}