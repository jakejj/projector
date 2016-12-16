import React from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import Loading from './Loading'


class Loader extends React.Component {

  constructor(props) {
    super(props)
    this.props.fetchData(props)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.params !== nextProps.params){
      this.props.fetchData(nextProps)
    }
  }

  render(){ return(this.props.children) }

}


@inject('appUIStore', 'projectStore') @observer
class ProjectLoader extends React.Component {

  query(){
    return ['Project', { id: this.props.params.projectId }, ['id', 'name', 'createdAt']]
  }

  fetchData(){
    return this.props.projectStore.fetch(
      ...this.query(),
      {option: 'First Option'}
    )
  }


  render(){
    let project = this.props.projectStore.get(...this.query())
    //let project = this.props.projectStore.get('Project', { id: this.props.params.projectId }, ['id', 'name', 'createdAt'])

    return(
      <Loader params={this.props.params} fetchData={this.fetchData.bind(this)}>
        <Project project={project} projectStore={this.props.projectStore} params={this.props.params}></Project>
      </Loader>
    )
  }

}


@observer
class Project extends React.Component {

  render(){
    let project = this.props.project

    if(!project){ return(<Loading />) }
    return (
      <Grid id="project" fluid={true}>
        <Row>
          <Col md={12}>
            <h1 className="page-title">{project.name} ({project.createdAt})</h1>
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


export default ProjectLoader
