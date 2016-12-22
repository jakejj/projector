import { action, computed, observable } from 'mobx'


export default class ProjectFormModel {
  @observable _model
  @observable name =  ''
  @observable id
  @observable saving =  false
  @observable saved = false

  constructor(app, values={}){
    this._model = values
    this.initialValues = values
    this.app = app
    this.set(values)
    return this
  }

  @action('updateProjectFormModel') set(values){
    //_.mapKeys(values, (value, key)=>{ this[key] = value })
    //return this.app.ProjectsStore.update(this)
    this.name = values.name
    this.id = values.id
  }

  @action('resetProjectFormModel') reset() {
    this.name = ''
    this.id = null
    this.saving = false
    this.saved = false
    this.set(this.initialValues)
  }

  save(){
    if(this.id){
      this.update()
    } else {
      this.create()
    }
  }

  create(){
    this.saving = true
    return this.app.projectStore.createProject({name: this.name})
    .then((status) => {
      this.saving = false
      if (status.success) {
        this.saved = true
        this.props.uiMessageStore.add('Project Created', 'success')
        this.reset()
      } else {
        this.props.uiMessageStore.add('Server Error', 'error')
      }
      return status
    })
  }

  update(){
    console.log('updating')
  }



}
