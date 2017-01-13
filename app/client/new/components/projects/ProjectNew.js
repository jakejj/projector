import React from 'react'
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import ProjectFormViewModel from '../../stores/project-form-view-model'
import FormState from '~/app/client/crossover/components/FormState'
import Loading from '~/app/client/crossover/components/Loading'
import { Redirect } from 'react-router'


@inject('uiFormStore', 'uiMessageStore') @observer
class ProjectNew extends React.Component {

  getViewModel() {
    return this.props.uiFormStore.use('projectNewForm', ProjectFormViewModel)
  }

  render(){
    return(
      <FormState getViewModel={this.getViewModel.bind(this)}>
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
