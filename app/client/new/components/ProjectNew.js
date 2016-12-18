import React from 'react'
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import ProjectFormNewModel from '../stores/project-form-new-model'
import FormState from './FormState'
import Loading from './Loading'
import { Redirect } from 'react-router'

@inject('uiFormStore', 'uiMessageStore') @observer
class ProjectNew extends React.Component {

  getViewModel() {
    return this.props.uiFormStore.use('projectNewForm', ProjectFormNewModel)
  }

  success() {
    this.props.uiMessageStore.add('Project Created', 'success')
  }

  failure(errors) {
    this.props.uiMessageStore.add('Server Error', 'error')
  }

  render(){
    return(
      <FormState viewModel={this.getViewModel()}
                 success={this.success.bind(this)}
                 failure={this.failure.bind(this)} >
        <ProjectNewForm />
      </FormState >
    )
  }

}

const ProjectNewForm = observer((props) => {
  console.log('called')
  if(props.viewModel.saving){ return(<Loading />) }
  if(props.viewModel.saved){
    return (<Redirect to='/new/projects' />)
  }
  return(
    <form onSubmit={props.handleSubmit}>
      <FormGroup controlId="formNewProject">
        <ControlLabel>New Project</ControlLabel>
        <FormControl
          name='name'
          type="text"
          placeholder="Project Name"
          value={props.viewModel.name}
          onChange={props.handleChange}
        />
      </FormGroup>
      <div>{props.viewModel.name}</div>
      <FormGroup controlId="formNewProject">
        <Button type="submit">Create Project</Button>
      </FormGroup>
    </form>
  )
})


export default ProjectNew
