import React from 'react'
import { Match, Miss, Link } from 'react-router'

import LayoutSwitcher from '../LayoutSwitcher'
import ProjectList from './ProjectList'
import Project from './Project'
import ProjectNew from './ProjectNew'
import ProjectEdit from './ProjectEdit'
import ProjectDelete from './ProjectDelete'

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
              <Match pattern={`${pathname}/:projectId/edit`} component={ProjectEdit} />
              <Match pattern={`${pathname}/:projectId/delete`} component={ProjectDelete} />
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


//              <Match pattern={`${pathname}/new`} component={ProjectNew} />
//              <Miss>
//                <Match pattern={`${pathname}/:projectId/edit`} component={ProjectNew} />
//                <Miss render={() => matchProps.params.projectId !== 'new'
//                  ? <Project {...matchProps}/>
//                  : null }/>
//              </Miss>
