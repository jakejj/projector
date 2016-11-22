import React from 'react'
import { observer, inject } from 'mobx-react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import Loading from './Loading'


@inject('projectStore') @observer
class ProjectList extends React.Component {


  render(){
    this.props.projectStore.fetch({})
    
    if(!this.props.projectStore.listLoaded){ return(<Loading />) }
    return (
      <Grid id="projects" fluid={true}>
        <Row>
          <Col md={12}>
            <h1 className="page-title">Projects</h1>
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
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default ProjectList