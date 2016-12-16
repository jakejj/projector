import React from 'react'
import { Match, Miss, Link } from 'react-router'

import LayoutSwitcher from './LayoutSwitcher'
import ProjectList from './ProjectList'
import Project from './Project'
import ProjectNew from './ProjectNew'


class Projects extends React.Component {
  render(){
    let { pathname } = this.props
    let mobile = false

    return(
      <LayoutSwitcher mobile={mobile}>
        <ProjectList />

        <div>
          <Match pattern={`${pathname}/:projectId`} render={(matchProps) => (
            <div>
              <Match pattern={`${pathname}/new`} component={ProjectNew} />
              <Miss render={() => matchProps.params.projectId !== 'new'
                ? <Project {...matchProps}/>
                : null }/>
            </div>
          )}/>
        </div>
        { this.props.children ? this.props.children : <div></div> }
      </LayoutSwitcher>
    )
  }
}

export default Projects
