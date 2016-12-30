import { action, computed, observable, extendObservable, autorun } from 'mobx'
import { mix } from '../../utils/utils'
import FormViewModelMixin from './form-view-model-mixin'
import ProjectModel from './project-model'


export default class ProjectFormModel extends mix(Object).with(FormViewModelMixin) {

  modelClass = ProjectModel

  viewModelProperties = {
    saving: false,
    saved: false
  }

  formProperties = {
    id: null,
    name: ''
  }


  validationStatus(fieldName){
    if(this.changedFields[fieldName]){
      if(this.isFieldValid(fieldName)){
        return 'success'
      }
      return 'error'
    }
    return null
  }

  changedFields = {}

  changedField(fieldName){
    console.log(fieldName)
    this.changedFields[fieldName] = true
  }

  isFieldValid(fieldName){
    return this.modelClass.validate(fieldName, this[fieldName])
  }

  isValid(){
    return true
    Object.keys(this.formProperties).reduce((valid, formProperty)=>{
      if(!this.isFieldValid(formProperty)){
        valid = false
      }
      return valid
    }, true)
  }



  constructor(app, values={}){
    super(...arguments)
    this.app = app
    this.initialValues = values
    this._model = this.initialValues
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
