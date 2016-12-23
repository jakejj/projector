import { action, computed, observable } from 'mobx'
import _ from 'lodash'


class UIStateViewerStore {
  @observable appState
  @observable editingItems
  @observable expandedItems
  @observable loadingChildrenItems

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
    this.startLoadingChildren(item)
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

  convertStateToTree(state) {
    return Object.keys(state).reduce((acc, key) => {
      let value = state[key]
      if (!value || key === 'app' || typeof value !== 'object') {
        return {...acc, [key]: value}
      } else {
        return {...acc, [key]: this.convertStateToTree(value)}
      }
    }, {})
  }

}

export default UIStateViewerStore
