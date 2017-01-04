import { action, computed, observable } from 'mobx'
import _ from 'lodash'
import { camelizeObject, decamelizeObject } from '../../utils/utils';


class ProjectModel {
  @observable name
  @observable createdAt
  @observable updatedAt
  @observable completedAt

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


ProjectModel.properties = {
  id: null,
  name: ''
}

ProjectModel.validations = {
  name: {
    presence: true,
    exclusion: {
      within: ["nicklas"],
      message: "'%{value}' is not allowed"
    }
  }
}


export default ProjectModel