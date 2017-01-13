import React from 'react'
import { observer, inject } from 'mobx-react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from '../../crossover/components/Loading'


@inject('projectStore') @observer
class ProjectList extends React.Component {

  constructor(props) {
    super(props)
    let projects = this.props.projectStore.load('Projects', {}, ['id', 'name'])
  }

  render(){
    let projects = this.props.projectStore.get('Projects', {}, ['id', 'name'])

    if(!projects){ return(<Loading />) }
    return (
      <Grid id="projects" fluid={true}>
        <Row>
          <Col md={12}>
            <h1 className="page-title">Projects</h1>
            <Link to={"/new/projects/new"} className="btn btn-default">+</Link>
          </Col>
        </Row>
        { this.props.projectStore.all.map((item, index)=>{ return(
            <Row key={index}>
              <Col md={12}>
                <Link to={"/new/projects/" + item.id}>
                  {item.name}
                </Link>
              </Col>
            </Row>
          )}
        )}
        <Row>
          <Col md={12}>
            <Link to={"/new/projects/"}>None</Link>
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default ProjectList