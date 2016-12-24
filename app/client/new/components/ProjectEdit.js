import React from 'react'
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import ProjectNewFormModel from '../stores/project-new-form-model'
import ProjectFormModel from '../stores/project-form-model'
import FormState from './FormState'
import Loading from './Loading'
import Loader from './Loader'
import { Redirect } from 'react-router'


//@inject('projectStore') @observer
//class ProjectLoader extends React.Component {
//
//  query(){
//    return ['Project', { id: this.props.params.projectId }, ['id', 'name', 'createdAt']]
//  }
//
//  render(){
//    let project = this.props.projectStore.get(...this.query())
//
//    return(
//      <Loader container={this} params={this.props.params} query={this.query.bind(this)} >
//        <Project project={project} />
//      </Loader>
//    )
//  }
//
//}

@inject('uiFormStore', 'uiMessageStore', 'projectStore') @observer
class ProjectEdit extends React.Component {

  query(){
    return ['Project', { id: this.props.params.projectId }, ['id', 'name', 'createdAt']]
  }

  getViewModel(model){
    return this.props.uiFormStore.use('projectEditForm', ProjectFormModel, model)
  }

  render(){
    let project = this.props.projectStore.get(...this.query())
    return(
      <Loader container={this} params={this.props.params} query={this.query.bind(this)} >
        {!project ? <Loading /> :
          <FormState viewModel={this.getViewModel(project)}>
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
      <FormGroup controlId="formProject">
        <ControlLabel>Edit Project</ControlLabel>
        <FormControl
          name='name'
          type="text"
          placeholder="Project Name"
          value={props.viewModel.name}
          onChange={props.handleChange}
        />
      </FormGroup>
      <div>{props.viewModel.name}</div>
      <FormGroup controlId="formProject">
        <Button type="submit">Update Project</Button>
      </FormGroup>
    </form>
  )
})


export default ProjectEdit
