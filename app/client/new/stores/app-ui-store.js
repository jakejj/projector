import mobx, { action, computed, observable } from 'mobx'
import _ from 'lodash'
import {filter, sortBy, map} from 'lodash/fp'


export default class AppUIStore {
  @observable location
  @observable routeParams
  
  constructor(app, {} = {}){
    this.app = app
  }

}