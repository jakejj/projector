import { action, computed, observable } from 'mobx'
import _ from 'lodash'


class UIStateViewerStore {
  @observable appState
  @observable editingItems = []
  @observable expandedItems = []
  @observable loadingChildrenItems = []
  @observable app

  constructor(app){
    this.app = app
  }

  @action onEdit = (item)=>{
    this.editingItems.push(item)
  }

  @action onUpdate = (item)=>{
    this.editingItems.pop(item)
  }

  @action onExpand = (item)=>{
    this.expandedItems.push(item)
  }

  @action onContract = (item)=>{
    _.pull(this.expandedItems, item)
  }

  @action('startLoadingChildren') startLoadingChildren = (item)=>{
    this.loadingChildrenItems.push(item)
    item.loadChildren().then(action('stopLoadingChildren', ()=>{
      this.loadingChildrenItems.pop(item)
    }))
  }

  @computed get appState() {
    return Object.keys(this.app.stores).reduce((acc, key) => {
      if (this.app.stores[key].serialize) {
        return {...acc, [key]: JSON.parse(this.app.stores[key].serialize)}
      } else {
        return acc
      }
    }, {})
  }

}

export default UIStateViewerStore




export function convertStateToTree(state) {
  let keys = state.keys ? state.keys() : Object.keys(state)
  return keys.reduce((acc, key) => {
    let value = state.keys ? state.get(key) : state[key]
    if (!value || key === 'app' || typeof value !== 'object') {
      if(key === 'app' || key === 'api'){
        return acc
      } else {
        return {...acc, [key]: value}
      }
    } else {
      return {...acc, [key]: convertStateToTree(value)}
    }
  }, {})
}
