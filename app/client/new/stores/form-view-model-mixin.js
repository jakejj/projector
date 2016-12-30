import { action, computed, observable, extendObservable } from 'mobx'


let FormViewModelMixin = (superclass) => class extends superclass {

  setup(){
    extendObservable(this, this.viewModelProperties)
    extendObservable(this, this.formProperties)
    this.set(this.initialValues)
  }


  @action('setForm') set(values){
    Object.keys(values).forEach((key)=>{
      this[key] = values[key]
    })
  }


  @action('resetForm') reset() {
    Object.keys(this.viewModelProperties).forEach((key) => {
      this[key] = this.viewModelProperties[key]
    })
    Object.keys(this.formProperties).forEach((key) => {
      this[key] = this.formProperties[key]
    })
    this.set(this.initialValues)
  }


  save(args){
    if(this.id){
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
    return Object.keys(this.formProperties).reduce((acc, key)=>{
      acc[key] = this[key]
      return acc
    }, {})
  }

}


export default FormViewModelMixin
