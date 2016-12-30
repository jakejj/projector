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

  @action('CreateForm') create(key, type, model=null){
    let viewModel = new type(app, model)
    this.forms.set(key, viewModel)
    return viewModel
  }

  use(key, type, model={}){
    let viewModel = this.get(key)
    return viewModel && viewModel._model == model ? viewModel : this.create(key, type, model)
  }

  get(key){
    return this.forms.get(key)
  }

}
