import mobx, { action, computed, observable } from 'mobx'
import mix from '../utils/mix'
import BaseClass from '../utils/base-class'
import StoreMixin from './store-mixin'


class TestStore extends mix(BaseClass).with(StoreMixin) {

  modelTypeName = 'Project'

  @observable models = mobx.map({})


  constructor(app, { api } = {}){
    super(...arguments)
    this.app = app
  }


  @computed get serialize() {
    let props = {models: this.models}
    return JSON.stringify(props)
  }

  comparator(a, b) {
    return a.name > b.name
  }

}

describe('StoreMixin', () => {

  let testStore
  let item1 = {id: 1, name: 'item1'}
  let item2 = {id: 2, name: 'item2'}
  let item3 = {id: 3, name: 'item3'}

  beforeEach(() => {
    testStore = new TestStore({})
  })

  it("should add item to store", () => {
    testStore.add(item1)
    expect(testStore.models.get(1)).toBe(item1)
  });

  it("should return all items", () => {
    testStore.add(item1)
    testStore.add(item2)
    testStore.add(item3)
    expect(testStore.all.length).toBe(3)
  });

  it("should sort list of items by comparator", () => {
    let list = [item2, item3, item1]
    let sorted = testStore.sort(list)
    expect(sorted[0]).toBe(item1)
    expect(sorted[1]).toBe(item2)
    expect(sorted[2]).toBe(item3)
  });

  it("should return all items sorted by comparator", () => {
    testStore.add(item3)
    testStore.add(item1)
    testStore.add(item2)
    let sorted = testStore.sorted
    expect(sorted[0]).toBe(item1)
    expect(sorted[1]).toBe(item2)
    expect(sorted[2]).toBe(item3)
  });


})
