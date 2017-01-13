import React from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import { observer, inject } from 'mobx-react'
import Loading from '~/app/client/crossover/components/Loading'
import Loader from '~/app/client/crossover/components/Loader'


@inject('projectStore') @observer
class ProjectLoader extends React.Component {

  query(){
    return ['Project', { id: this.props.params.projectId }, ['id', 'name', 'createdAt']]
  }

  render(){
    let project = this.props.projectStore.get(...this.query())

    return(
      <Loader container={this} params={this.props.params} query={this.query.bind(this)} >
        <Project project={project} />
      </Loader>
    )
  }

}


const Project = observer((props) => {
  let project = props.project
  if(!project){ return(<Loading />) }
  return (
    <Grid id="project" fluid={true}>
      <Row>
        <Col md={12}>
          <h1 className="page-title">{project.name} ({project.createdAt})</h1>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <Link to={`/new/projects/${project.id}/edit`} className="btn btn-default">Edit</Link>
        </Col>
        <Col md={2}>
          <Link to={`/new/projects/${project.id}/delete`} className="btn btn-default">Delete</Link>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
        </Col>
      </Row>
    </Grid>
  )
})


export default ProjectLoader
