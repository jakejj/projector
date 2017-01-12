import mobx, { action, computed, observable } from 'mobx'
import { mixin } from '../../utils/utils'


let StoreMixin = (superclass) => class extends superclass {
//let StoreMixin = mixin(class {

//  constructor(){
//    super()
//  }


  @computed get serialize() {
    let { app, ...rest } = this
    return JSON.stringify(rest)
  }

  @computed get all(){
    return this.models.values()
  }

  sort(list){
    return list.sort(this.comparator)
  }

  @computed get sorted(){
    return this.sort(this.all)
  }

  @action('addModel') add(model){
    this.models.set(model.id, model)
  }

}


export default StoreMixin