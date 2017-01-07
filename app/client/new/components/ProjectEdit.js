import React from 'react'
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import ProjectNewFormModel from '../stores/project-new-form-model'
import ProjectFormModel from '../stores/project-form-model'
import FormState from './FormState'
import Loading from './Loading'
import Loader from './Loader'
import { Redirect } from 'react-router'


@inject('uiFormStore', 'uiMessageStore', 'projectStore') @observer
class ProjectEdit extends React.Component {

  query(){
    return ['Project', { id: this.props.params.projectId }, ['id', 'name', 'createdAt']]
  }

  getModel() {
    return this.props.projectStore.get(...this.query())
  }

  getViewModel(model){
    return this.props.uiFormStore.use('projectEditForm' + this.props.params.projectId, ProjectFormModel, this.getModel.bind(this))
  }

  render(){
    let project = this.getModel()
    return(
      <Loader container={this} params={this.props.params} query={this.query.bind(this)} >
        {!project ? <Loading /> :
          <FormState getViewModel={this.getViewModel.bind(this)} >
            <ProjectEditForm project={project} />
          </FormState >
        }
      </Loader>
    )
  }

}


const ProjectEditForm = observer((props) => {
  if(props.viewModel.saving){ return(<Loading />) }
  return(
    <form onSubmit={props.handleSubmit}>
      <FormGroup controlId="formProject" validationState={props.viewModel.validationStatusFor('name')}>
        <ControlLabel>Edit Project</ControlLabel>
        {()=>{
          let em = props.viewModel.validationMessagesFor('name')
          return em ? <div>{em}</div> : null
        }()}
        <FormControl
          name='name'
          type="text"
          placeholder="Project Name"
          value={props.viewModel.fields.name}
          onChange={props.handleChange}
        />
      </FormGroup>
      <div>{props.viewModel.fields.name}</div>
      <FormGroup controlId="formProject">
        <Button type="submit">Update Project</Button>
        <Button onClick={props.handleReset}>Reset</Button>
      </FormGroup>
    </form>
  )
})


export default ProjectEdit
