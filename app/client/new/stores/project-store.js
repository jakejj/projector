import mobx, { action, computed, observable } from 'mobx'
import { mix } from '../../utils/utils'
import StoreMixin from './store-mixin'
import GqlStoreMixin from './gql-store-mixin'
//import ProjectModel from './project-model'


//export default class ProjectStore extends mix(Object).with(StoreMixin, GqlStoreMixin) {
export default class ProjectStore extends GqlStoreMixin {

  modelTypeName = 'Project'
  createGql = 'mutation createProject($name: String!){createProject(input: {name: $name}){ project{ id, name } }}'
  updateGql = 'mutation updateProject($name: String!, $id: ID!){updateProject(input: {name: $name, id: $id}){ project{ id, name, createdAt } }}'

  @observable models = mobx.map({})


  constructor(app, { api } = {}){
    super(...arguments)
    this.app = app
    return this
  }

//  constructor(){
//    super(...arguments)
//  }

  @computed get serialize() {
    let props = {models: this.models}
    return JSON.stringify(props)
  }

}
