import mobx, { action, computed, observable, extendObservable } from 'mobx'
import _ from 'lodash'
import { convertStateToTree } from './ui-stateviewer-store'


export default class UIFormStore {
  @observable forms = mobx.map({})

  constructor(app, {} = {}){
    this.app = app
  }

  @computed get serialize() {
    let props = {forms: this.forms}
    return JSON.stringify(convertStateToTree(props))
  }

  @action('CreateForm') create(key, type, modelOrGetModel=null){
    let viewModel = new type(app, modelOrGetModel)
    this.forms.set(key, viewModel)
    return viewModel
  }

  use(key, type, modelOrGetModel){
    let viewModel = this.get(key)
    return viewModel ? viewModel : this.create(key, type, modelOrGetModel)
  }

  get(key){
    return this.forms.get(key)
  }

}
