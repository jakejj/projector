import { action, computed, observable, extendObservable } from 'mobx'


let FormViewModelMixin = (superclass) => class extends superclass {

  setup(initialValues=null){
    if(initialValues){
      this.initialValues = initialValues
    }
    
    extendObservable(this, this.formProps)

    extendObservable(this, {fields: {}})
    extendObservable(this.fields, this.fieldProps)
    
    this.set(this.initialValues)
  }


  @action('setForm') set(values){
    Object.keys(values).forEach((key)=>{
      this.fields[key] = values[key]
    })
  }

<<<<<<< HEAD

  @action('resetForm') reset() {
    Object.keys(this.viewModelProperties).forEach((key) => {
      this[key] = this.viewModelProperties[key]
    })
    Object.keys(this.formProperties).forEach((key) => {
      this[key] = this.formProperties[key]
    })
    this.set(this.initialValues)
=======
  @action('resetForm') reset(){
    this.setup()
>>>>>>> refs/heads/validations
  }


  save(args){
    if(this.fields.id){
      this.update(args)
    } else {
      this.create(args)
    }
  }


  create(args){
    args.successMessage = args.createSuccessMessage
    args.errorMessage = args.createErrorMessage
    this._execute('create', args)
  }

  update(args){
    args.successMessage = args.updateSuccessMessage
    args.errorMessage = args.updateErrorMessage
    this._execute('update', args)
  }


  _execute(storeAction, {store, successMessage, errorMessage} = {}){
    this.saving = true
    return store[storeAction](this._getFormValues())
    .then((status) => {
      this.saving = false
      if (status.success) {
        this.saved = true
        this.app.uiMessageStore.add(successMessage, 'success')
        this.reset()
      } else {
        this.app.uiMessageStore.add(errorMessage, 'error')
      }
      return status
    })
  }


  _getFormValues(){
    return Object.keys(this.fieldProps).reduce((acc, key)=>{
      acc[key] = this.fields[key]
      return acc
    }, {})
  }

}


export default FormViewModelMixin
