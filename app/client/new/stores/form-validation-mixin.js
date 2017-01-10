import { action, computed, observable } from 'mobx'
import { validate } from 'validate.js'


/////////////////////////////////////////////////
// Usage:
// You must include the validationStatuses: {}
// property on the view Model
/////////////////////////////////////////////////

let FormValidationMixin = (superclass) => class extends superclass {

  validateField(fieldName){
    let messages = prepareValidationMessagesForField(fieldName, this.validations[fieldName], this.fields[fieldName])
    let validationStatus

    if(messages){
      validationStatus = {status: 'error', messages: messages}
    } else {
      validationStatus = {status: 'success'}
    }
    this.validationStatuses[fieldName] = validationStatus
    return validationStatus
  }


  validateForm(){
    let errors = Object.keys(this.fieldProps).reduce((errorMessages, fieldName)=>{
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

}

export default FormValidationMixin


function prepareValidationMessagesForField(fieldName, fieldValidations, value){
  let validations = {[fieldName]: fieldValidations}
  let messages = validate({[fieldName]: value}, validations)
  if(messages && messages[fieldName]){
    return messages[fieldName]
  }
  return null
}