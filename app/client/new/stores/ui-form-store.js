import mobx, { action, computed, observable, extendObservable } from 'mobx'
import _ from 'lodash'


export default class UIFormStore {
  @observable forms = mobx.map({})

  constructor(app, {} = {}){
    this.app = app
  }

  @action('CreateForm') create(key, type){
    let viewModel = new type(app)
    this.forms.set(key, viewModel)
    return viewModel
  }
  
  use(key, type){
    let model = this.get(key)
    return model ? model : this.create(key, type)
  }
  
  get(key){
    return this.forms.get(key)
  }

}