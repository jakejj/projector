//import { action, computed, observable, extendObservable } from 'mobx'
//import { mix } from '../../utils/utils'
//
//
//let FormViewModelMixin = (superclass) => class extends superclass {
//  
//  setup(){
//    //Object.keys(this.observableProperties).forEach((key)=>{
//    //  this[key] = observable(this.observableProperties[key])
//    //})
//    
//    extendObservable(this, this.observableProperties)
//    console.log(this)
//    //this.update(this.initialValues)
//  }
//  
//  @action('updateForm') update(values){
//    Object.keys(values).forEach((key)=>{
//      this[key] = values[key]
//    })
//  }
//  
//  @action('resetForm') reset() {
//    this.setup()
//  }
//
//  save({store, successMessage, errorMessage} = {}){
//    this.saving = true
//    return store.create({name: this.name})
//    .then((status) => {
//      this.saving = false
//      if (status.success) {
//        this.saved = true
//        this.props.uiMessageStore.add(successMessage, 'success')
//        this.reset()
//      } else {
//        this.props.uiMessageStore.add(errorMessage, 'error')
//      }
//      return status
//    })
//  }
//
//}
//
//
//export default class ProjectNewFormModel extends mix(Object).with(FormViewModelMixin) {
//
//  observableProperties = {name: '', saving: false, saved: false}
//
//  constructor(app, values={}){
//    super(...arguments)
//    this.app = app
//    this.initialValues = values
//    this.setup()
//  }
//
//  save(){
//    super.save({
//      store: this.app.projectStore, 
//      successMessage: 'Project Created', 
//      errorMessage: 'Server Error'
//    })
//  }
//
//}
