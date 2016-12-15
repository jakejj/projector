import React from 'react'
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'

@inject('appUIStore', 'projectStore') @observer
export default class ProjectName extends React.Component {

  render(){
    return(
      <form>
        <FormGroup controlId="formNewProject">
          <ControlLabel>New Project</ControlLabel>
          <FormControl
            type="text"
  
            placeholder="Project Name"
  
          />
        </FormGroup>
        <FormGroup controlId="formNewProject">
          <Button type="submit">Create Project</Button>
        </FormGroup>
      </form>
    )
  }

}
