import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import Loading from './Loading'
import { Redirect } from 'react-router'

@inject('projectStore') @observer
class ProjectDelete extends React.Component {
  @observable loading = true
  @observable success = false

  constructor(props) {
    super(props)
    this.props.projectStore.delete({id: this.props.params.projectId})
    .then((response) => {
      this.handleResponse(response)
    })
  }

  @action handleResponse(response) {
    this.loading = false
    if (response.success) {
      this.success = true
    }
  }

  render(){
    if (this.loading) {
      return <Loading />
    }
    if (this.success) {
      return <Redirect to={'/new/projects/'} />
    }
    return <Redirect to={`/new/projects/${this.props.params.projectId}`} />
  }

}

export default ProjectDelete
