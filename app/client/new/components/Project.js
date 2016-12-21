import React from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import Loading from './Loading'


class Loader extends React.Component {

  constructor(props) {
    super(props)
    this.fetchData(props)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.params !== nextProps.params){
      this.fetchData(nextProps)
    }
  }

  fetchData(){
    return this.props.container.props.projectStore.fetch(
      ...this.props.query(),
      {option: 'First Option'}
    )
  }

  render(){ return(this.props.children) }

}


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
        <Col md={12}>
        </Col>
      </Row>
    </Grid>
  )
})


export default ProjectLoader
