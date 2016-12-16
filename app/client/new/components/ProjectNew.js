import React from 'react'
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import ProjectFormNewModel from '../stores/project-form-new-model'


@inject('uiFormStore') @observer
class ProjectNew extends React.Component {

  constructor(props) {
    super(props)
    this.model = this.props.uiFormStore.use('projectNewForm', ProjectFormNewModel)
  }
  
  componentWillUnmount(){
    this.model = null
  }
  
  handleSubmit(e){
    
  }
  
  handleChange(e){
    this.model[e.target.name] = e.target.value
  }

  render(){
    let model = this.model
    
    return(
      <form onSubmit={e => {e.preventDefault(); model.save()}}>
        <FormGroup controlId="formNewProject">
          <ControlLabel>New Project</ControlLabel>
          <FormControl
            type="text"
            placeholder="Project Name"
            value={model.name}
            onChange={e => model.name = e.target.value}
          />
        </FormGroup>
        <div>{model.name}</div>
        <FormGroup controlId="formNewProject">
          <Button type="submit">Create Project</Button>
        </FormGroup>
      </form>
    )
  }

}


export default ProjectNew