import React from 'react'
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import ProjectFormNewModel from '../stores/project-form-new-model'
import FormState from './FormState'

@inject('uiFormStore') @observer
class ProjectNew extends React.Component {

  getViewModel() {
    return this.props.uiFormStore.use('projectNewForm', ProjectFormNewModel)
  }

  render(){
    return(
      <FormState container={this}>
        <ProjectNewForm />
      </FormState >
    )
  }

}

const ProjectNewForm = observer((props) => {
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
