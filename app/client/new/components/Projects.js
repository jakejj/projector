import React from 'react'

import LayoutSwitcher from './LayoutSwitcher'
import ProjectList from './ProjectList'


class Projects extends React.Component {
  render(){
    let mobile = false
    
    return(
      <LayoutSwitcher mobile={mobile}>
        <ProjectList />
        { this.props.children ? this.props.children : <div></div> }
      </LayoutSwitcher>
    )
  }
}

export default Projects