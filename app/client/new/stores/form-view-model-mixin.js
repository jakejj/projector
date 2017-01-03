import { action, computed, observable, extendObservable } from 'mobx'


let FormViewModelMixin = (superclass) => class extends superclass {

  setup(){
    extendObservable(this, this.viewModelProperties)
    extendObservable(this, this.formProperties)
    //extendObservable(this, extractFormPropertyValues(this.formProperties))
    this.set(this.initialValues)
  }


  @action('setForm') set(values){
    Object.keys(values).forEach((key)=>{
      this[key] = values[key]
    })
  }


  @action('resetForm') reset() {
    this.setup()
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

//function extractFormPropertyValues(formProperties){
//  return Object.keys(formProperties).map((key)=>{
//    let prop = formProperties[key]
//    if(typeof prop === 'function'){
//      prop = prop()
//    }
//    if(typeof prop === 'object' && prop !== null){
//      if(prop.default){
//        return prop.default
//      } else {
//        return null
//      }
//    } else {
//      return prop
//    }
//  })
//}


export default FormViewModelMixin