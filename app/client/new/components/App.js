import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router'

import Messages from './Messages';


class App extends React.Component {

  render(){
    return (

      <div id="crabrat-app">
        <div id="crabrat-app-header">
          {
            <Messages />
          }
          
        </div>
        <div id="crabrat-app-content">
          { this.props.children }
        </div>
      </div>

    )
  }

}

export default withRouter(App)