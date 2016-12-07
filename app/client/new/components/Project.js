import React from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import Loading from './Loading'


class Wrapper extends React.Component {

  constructor(props) {
    super(props)
    this.props.fetchModel(props)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.params !== nextProps.params){
      this.props.fetchModel(nextProps)
    }
  }

  render(){ return(this.props.children) }

}


@inject('appUIStore', 'projectStore') @observer
class ProjectWrapper extends React.Component {


  fetchModel(){
    return this.props.projectStore.fetch({id: this.props.params.projectId, props: 
      [
        'id',
        'name',
        'created_at'
      ]
    })
    
//    {
//      {
//        type: 'Project'
//        params: { id: '1' }
//        fields: ['id, name, createdAt, completed_tasks']
//      }
//      {
//        type: 'Task'
//        values: ['id', 'name']
//        query: {
//          projectId: '1'
//          completedAt: !null
//        }
//      }
//    }
    
  }

  project
  project.tasks
  preject.completed_tasks



  render(){
    let project = this.props.projectStore.get({id: this.props.params.projectId})
    return( 
      <Wrapper params={this.props.params} fetchModel={this.fetchModel.bind(this)}>
        <Project project={project} projectStore={this.props.projectStore} params={this.props.params}></Project>
      </Wrapper>
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


//@inject('appUIStore', 'projectStore') @observer
//class ProjectLoader extends React.Component {
//  componentWillReceiveProps(props) {
//    let p = props.projectStore.fetch({id: props.params.projectId, props: 
//      [
//        'id',
//        'name',
//      ]
//    })
//    
//    if(p){
//    p.then((response)=>{
//      console.log('Project p', response)
//      this.project = response
//    })
//    console.log(p)
//    console.log('Project', this.project)
//    }
//  }
//  
//  render(){
//    return(<Project />)
//  }
//}


export default ProjectWrapper