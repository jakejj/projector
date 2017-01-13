import mobx, { action, computed, observable } from 'mobx'
import { mix, BaseClass } from '../../utils/utils'
import StoreMixin from '../../crossover/mixins/store-mixin'
import GqlStoreMixin from '../../crossover/mixins/gql-store-mixin'
//import ProjectModel from './project-model'


class ProjectStore extends mix(BaseClass).with(GqlStoreMixin, StoreMixin) {

  modelTypeName = 'Project'
  createGql = 'mutation createProject($name: String!){createProject(input: {name: $name}){ project{ id, name } }}'
  updateGql = 'mutation updateProject($name: String!, $id: ID!){updateProject(input: {name: $name, id: $id}){ project{ id, name, createdAt } }}'

  @observable models = mobx.map({})


  constructor(app, { api } = {}){
    super(...arguments)
    this.app = app
  }


  @computed get serialize() {
    let props = {models: this.models}
    return JSON.stringify(props)
  }

}

export default ProjectStore