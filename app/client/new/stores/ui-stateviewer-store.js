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
    return Object.keys(this.app).reduce((acc, key) => {
      if (this.app[key].serialize) {
        return {...acc, [key]: JSON.parse(this.app[key].serialize)}
      } else {
        return acc
      }
    }, {})
  }

  // convertStateToTree(state) {
  //   return Object.keys(state).reduce((acc, key) => {
  //     let value = state[key]
  //     if (!value || key === 'app' || typeof value !== 'object') {
  //       if(key === 'app' || key === 'api'){
  //         return acc
  //       } else {
  //         return {...acc, [key]: value}
  //       }
  //     } else {
  //       return {...acc, [key]: this.convertStateToTree(value)}
  //     }
  //   }, {})
  // }

}

export default UIStateViewerStore
