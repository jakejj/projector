import { action, computed, observable } from 'mobx'
import _ from 'lodash'
// import { camelizeObject, decamelizeObject } from '../../utils/utils';
import { mix, BaseClass } from '../../utils/utils'
import SerializableModelMixin from './serializable-model-mixin'


class ProjectModel extends mix(BaseClass).with(SerializableModelMixin) {
  @observable name
  @observable createdAt
  @observable updatedAt
  @observable completedAt

  constructor(app, values={}){
    super(...arguments)
    this.app = app

    this.setValues(this, values)
    return this
  }

  @action setValues(self, values){
    values = camelizeObject(values)
    _.mapKeys(values, (value, key)=>{
      self[key] = value
    })
  }

  @action('update') update(values){
    this.setValues(this, values)
    return this.app.ProjectsStore.update(this)
  }

}

window.ProjectModel = ProjectModel


ProjectModel.props = {
  id: null,
  name: ''
}

ProjectModel.propTypes = {
  id: 'int'
}

ProjectModel.validations = {
  name: {
    presence: true,
    exclusion: {
      within: ["nicklas"],
      message: "'%{value}' is not allowed"
    }
  }
}


export default ProjectModel
