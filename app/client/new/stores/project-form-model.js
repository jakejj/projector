import { action, computed, observable, extendObservable, autorun } from 'mobx'
import { mix, BaseClass } from '../../utils/utils'

//import FormValidationMixin from 'crossover'

//import FormViewModelMixin from './form-view-model-mixin'
//import FormValidationMixin from './form-validation-mixin'

import FormViewModelMixin from '../../crossover/mixins/form-view-model-mixin'
import FormValidationMixin from '../../crossover/mixins/form-validation-mixin'

import ProjectModel from './project-model'


export default class ProjectFormModel extends mix(BaseClass).with(FormViewModelMixin, FormValidationMixin) {

  constructor(app, values={}){
    super(...arguments)
    this.app = app
    this.formProps = {
      saving: false,
      saved: false,
      validationStatuses: {}
    }
    this.fieldProps = ProjectModel.props
    this.validations = ProjectModel.validations

    this.setup(values)
  }


  save(){
    if(this.isValid()){
      super.save({
        store: this.app.projectStore,
        createSuccessMessage: 'Project Created',
        createErrorMessage: 'Server Error Creating Project',
        updateSuccessMessage: 'Project Updated',
        updateErrorMessage: 'Server Error Updating Project',
      })
    }
  }

}
