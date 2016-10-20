import { action, computed, observable } from 'mobx'
import _ from 'lodash'
import { camelizeObject, decamelizeObject } from '../../utils/utils';


export default class ProjectModel {
  @observable name

  constructor(app, values={}){
    this.app = app
    
    this.setValues(this, values)
    return this
  }

  @action setValues(self, values){
    values = camelizeObject(values)
    _.mapKeys(values, (value, key)=>{ 
      self[key] = value
    })
  }

  update(values){
    this.setValues(this, values)
    return this.app.ProjectsStore.update(this)
  }

}