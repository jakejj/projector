import mobx, { action, computed, observable } from 'mobx'


export default class UIRouteStore {
  @observable location = {}
  @observable routeParams
  
  constructor(app, {} = {}){
    this.app = app
  }
  
  @action('setLocation') setLocation(newLocation){
    this.location = newLocation
  }

}