import React from 'react'
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import ProjectFormModel from '../stores/project-form-model'
import FormState from '../../crossover/components/FormState'
import Loading from '../../crossover/components/Loading'
import { Redirect } from 'react-router'


@inject('uiFormStore', 'uiMessageStore') @observer
class ProjectNew extends React.Component {

  getViewModel() {
    return this.props.uiFormStore.use('projectNewForm', ProjectFormModel)
  }

  render(){
    return(
      <FormState viewModel={this.getViewModel()}>
        <ProjectNewForm />
      </FormState >
    )
  }

}

const ProjectNewForm = observer((props) => {
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
