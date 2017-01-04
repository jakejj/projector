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
    //validationMessages: {}
    validationStatuses: {}
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



//  changedFields = {}
//
//  changedField(fieldName){
//    console.log(fieldName)
//    this.changedFields[fieldName] = true
//  }
  
  
  //validationStatus(fieldName){
  //  if(this.changedFields[fieldName]){
  //    let validationMessages = this.getErrorMessages(fieldName, this.validations[fieldName], this[fieldName])
  //
  //    if(validationMessages && validationMessages[fieldName]){
  //      this.validationMessages[fieldName] = validationMessages[fieldName]
  //      return 'error'
  //    } else {
  //      this.validationMessages[fieldName] = undefined
  //      return 'success'
  //    }
  //  }
  //  return null
  //}
  //
  //getErrorMessages(fieldName, fieldValidations, value){
  //  let validations = {[fieldName]: fieldValidations}
  //  return validate({[fieldName]: this[fieldName]}, validations)
  //}


  validateField(fieldName){
    let messages = this.prepareValidationMessagesForField(fieldName, this.validations[fieldName], this[fieldName])
    let validationStatus

    if(messages){
      validationStatus = {status: 'error', messages: messages}
    } else {
      validationStatus = {status: 'success'}
    }
    this.validationStatuses[fieldName] = validationStatus
    return validationStatus
  }

  prepareValidationMessagesForField(fieldName, fieldValidations, value){
    let validations = {[fieldName]: fieldValidations}
    let messages = validate({[fieldName]: this[fieldName]}, validations)
    if(messages && messages[fieldName]){
      return messages[fieldName]
    }
    return null
  }

  validateForm(){
    let errors = Object.keys(this.formProperties).reduce((errorMessages, fieldName)=>{
      let validationStatus = this.validateField(fieldName)
      if(validationStatus.status === 'error'){
        errorMessages[fieldName] = validationStatus.messages
      }
      return errorMessages
    }, {})

    if(Object.keys(errors).length === 0){
      return {status: 'success'}
    } else {
      return {status: 'error', messages: errors}
    }
  }

  changedField(fieldName){
    this.validateField(fieldName)
  }

  validationMessagesFor(fieldName){
    return this.validationStatuses[fieldName] ? this.validationStatuses[fieldName].messages : null
  }

  validationStatusFor(fieldName){
    return this.validationStatuses[fieldName] ? this.validationStatuses[fieldName].status : null
  }

  isValid(){
    let validationStatus = this.validateForm()
    return validationStatus.status === 'success' ? true : false
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
