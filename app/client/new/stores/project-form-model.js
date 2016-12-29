import { action, computed, observable, extendObservable } from 'mobx'
import { mix } from '../../utils/utils'


let FormViewModelMixin = (superclass) => class extends superclass {
  
  setup(){
    extendObservable(this, this.observableProperties)
console.log(this.initialValues)
//    this.set(this.initialValues)
  }


  @action('updateForm') set(values){
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


//  create({store, successMessage, errorMessage} = {}){
//    this.saving = true
//    return this.app.projectStore.create({name: this.name})
//    .then((status) => {
//      this.saving = false
//      if (status.success) {
//        this.saved = true
//        this.props.uiMessageStore.add('Project Created', 'success')
//        this.reset()
//      } else {
//        this.props.uiMessageStore.add('Server Error', 'error')
//      }
//      return status
//    })
//  }
//
//
//  update({store, successMessage, errorMessage} = {}){
//    this.saving = true
//    return this.app.projectStore.update({name: this.name, id: this.id})
//    .then((status) => {
//      this.saving = false
//      if (status.success) {
//        this.saved = true
//        this.app.uiMessageStore.add('Project Updated', 'success')
//        this.reset()
//      } else {
//        this.app.uiMessageStore.add('Server Error', 'error')
//      }
//      return status
//    })
//  }

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
    return store[storeAction]({name: this.name, id: this.id})
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


}



export default class ProjectFormModel extends mix(Object).with(FormViewModelMixin) {
  //@observable _model
  //@observable name =  ''
  //@observable id
  //@observable saving =  false
  //@observable saved = false
  
  observableProperties = {
    id: null,
    name: '', 
    saving: false, 
    saved: false
  }

  constructor(app, values={}){
    //this._model = values
    //this.initialValues = values
    //this.app = app
    //this.set(values)
    //return this
    
    super(...arguments)
    this.app = app
    this.initialValues = values
console.log(values)
console.log(this.initialValues)
    this.setup()
  }

//  @action('updateProjectFormModel') set(values){
//    //_.mapKeys(values, (value, key)=>{ this[key] = value })
//    //return this.app.ProjectsStore.update(this)
//    this.name = values.name
//    this.id = values.id
//  }
//
//  @action('resetProjectFormModel') reset() {
//    this.name = ''
//    this.id = null
//    this.saving = false
//    this.saved = false
//    this.set(this.initialValues)
//  }
//
//    save(){
//      super.save({
//        store: this.app.projectStore, 
//        successMessage: 'Project Created', 
//        errorMessage: 'Server Error'
//      })
//    }


    save(){
      super.save({
        store: this.app.projectStore, 
        createSuccessMessage: 'Project Created', 
        createErrorMessage: 'Server Error Creating Project',
        updateSuccessMessage: 'Project Updated', 
        updateErrorMessage: 'Server Error Updating Project',
      })
    }

}
