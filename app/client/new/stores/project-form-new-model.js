import { action, computed, observable } from 'mobx'


export default class ProjectFormNewModel {
  @observable name =  'initial'

  constructor(app, values={}){
    this.app = app
    this.update(this, values)
    return this
  }

  @action('updateProjectFormNewModel') update(values){
    _.mapKeys(values, (value, key)=>{ self[key] = value })
    //return this.app.ProjectsStore.update(this)
  }
  
  save(){
    console.log(this)
  }

}