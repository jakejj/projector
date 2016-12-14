import React from 'react'
import { Match, Miss, Link } from 'react-router'

import LayoutSwitcher from './LayoutSwitcher'
import ProjectList from './ProjectList'
import Project from './Project'


class Projects extends React.Component {
  render(){
    let { pathname, projectId } = this.props
    let mobile = false

    return(
      <LayoutSwitcher mobile={mobile}>
        <ProjectList />
        
        <Match pattern={`${pathname}/:projectId`} component={Project} />
        <Miss render={() => (
          <div>None Selected</div>
        )}/>
        { this.props.children ? this.props.children : <div></div> }
      </LayoutSwitcher>
    )
  }
}

export default Projects