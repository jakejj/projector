import { action, computed, observable, extendObservable, autorun } from 'mobx'
import { mix } from '../../utils/utils'
import FormViewModelMixin from './form-view-model-mixin'
import ProjectModel from './project-model'

import { validate } from 'validate.js'

let conditions = {username: {
  presence: true,
  exclusion: {
    within: ["nicklas"],
    message: "'%{value}' is not allowed"
  }
}}

let conditions2 = {
    presence: {
      presence: true,
      message: "'%{value}' must be filled in"
    },
    exclusion: {
      within: ["nicklas"],
      message: "'%{value}' is not allowed"
    }
}

//console.log(validate({username: 'nicklas'}, conditions))
//console.log(validate.single('nicklas', conditions2))
//console.log(validate)

export default class ProjectFormModel extends mix(Object).with(FormViewModelMixin) {

  modelClass = ProjectModel

  viewModelProperties = {
    saving: false, 
    saved: false,
    validationMessages: {}
  }

  formProperties = {
    id: null,
    name: ''
  }



  validations = {
    name: {
      presence: true,
      exclusion: {
        within: ["nicklas"],
        message: "'%{value}' is not allowed"
      }
    }
  }

  validationStatus(fieldName){
    if(this.changedFields[fieldName]){
      let validationMessages = this.getErrorMessages(fieldName, this.validations[fieldName], this[fieldName])

      if(validationMessages && validationMessages[fieldName]){
        this.validationMessages[fieldName] = validationMessages[fieldName]
        return 'error'
      } else {
        this.validationMessages[fieldName] = undefined
        return 'success'
      }
    }
    return null
  }
  
  getErrorMessages(fieldName, fieldValidations, value){
    let validations = {[fieldName]: fieldValidations}
    return validate({[fieldName]: this[fieldName]}, validations)
  }


  validateField(){
    
  }

  validateForm(){
    
  }





//  validationStatus(fieldName){
//    if(this.changedFields[fieldName]){
//      if(this.isFieldValid(fieldName)){
//        return 'success'
//      }
//      return 'error'
//    }
//    return null
//  }

  changedFields = {}

  changedField(fieldName){
    console.log(fieldName)
    this.changedFields[fieldName] = true
  }

//  isFieldValid(fieldName){
//    return this.modelClass.validate(fieldName, this[fieldName])
//  }
//
//  isValid(){
//    Object.keys(this.formProperties).reduce((valid, formProperty)=>{
//      if(!this.isFieldValid(formProperty)){
//        valid = false
//      }
//      return valid
//    }, true)
//  }



  constructor(app, values={}){
    super(...arguments)
    this.app = app
    this.initialValues = values
    this.setup()
  }


  save(){
    if(this.isValid()){
      super.save({
        store: this.app.projectStore, 
        createSuccessMessage: 'Project Created', 
        createErrorMessage: 'Server Error Creating Project',
        updateSuccessMessage: 'Project Updated', 
        updateErrorMessage: 'Server Error Updating Project',
      })
    }
  }

}
