import { action, computed, observable } from 'mobx'


export default class ProjectFormNewModel {
  @observable name =  ''
  @observable saving =  false
  @observable saved = false

  constructor(app, values={}){
    this.initialValues = values
    this.app = app
    this.update(this, values)
    return this
  }

  @action('updateProjectFormNewModel') update(values){
    _.mapKeys(values, (value, key)=>{ this[key] = value })
    //return this.app.ProjectsStore.update(this)
  }

  @action('resetProjectFormNewModel') reset() {
    this.name = ''
    this.saving = false
    this.saved = false
    this.update(this.initialValues)
  }

  save(){
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

}
