import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import SplitPane from 'react-split-pane'


class LayoutSwitcher extends Component {
  render(){
    //let childrenWithProps = React.Children.map(this.props.children, 
    //  (child) => { 
    //    return React.cloneElement(child, { mobile: this.props.mobile })
    //  }
    //)
    //<div>{childrenWithProps}</div>

    if(this.props.mobile){
      return(
        <div>{this.props.children}</div>
      )
    } else {
      return(
        <SplitPane split="vertical" minSize={50} defaultSize={400} onChange={ size => size }>
          {this.props.children}
        </SplitPane>
      )
    }
  }
}

export default LayoutSwitcher