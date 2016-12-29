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


ProjectModel.validate = function validate(fieldName, value){
  switch(fieldName){
    case 'name': 
      return validatePresence(value)
    default:
      return true
  }
}


function validatePresence(value){
  if(typeof value === 'string'){
    if(value.length > 0){ return true }
  } else if(typeof value === 'number'){
    return true
  } else if(typeof value === 'object'){
    return true
  }
  return false
}


export default ProjectModel