import React from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import Loading from './Loading'


@inject('appUIStore', 'projectStore') @observer
class Project extends React.Component {


  getProject(){
    return this.props.projectStore.get({id: this.props.appUIStore.routeParams.projectId, props: 
      [
        'id',
        'name'
      ]
    })
  }

  render(){
    let project = this.getProject()

    if(!project){ return(<Loading />) }
    return (
      <Grid id="project" fluid={true}>
        <Row>
          <Col md={12}>
            <h1 className="page-title">{project.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default Project