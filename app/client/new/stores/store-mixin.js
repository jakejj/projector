import mobx, { action, computed, observable } from 'mobx'


let StoreMixin = (superclass) => class extends superclass {

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