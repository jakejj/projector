import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
//import { withRouter } from 'react-router'
import { BrowserRouter, Match, Miss, Link } from 'react-router'
import { Provider } from 'mobx-react'

import app from '../config'
import Messages from './Messages'
import Projects from './Projects'

class App extends React.Component {

  render(){
    return (

      <BrowserRouter>
        <Provider {...app} >
          <div id="crabrat-app">
            <div id="crabrat-app-header">
              {
                <Messages />
              }
              
            </div>
            <div id="crabrat-app-content">
              { this.props.children }
              <Match pattern="/new/projects" component={Projects} />
            </div>
          </div>
        </Provider>
      </BrowserRouter>

    )
  }

}

//export default withRouter(App)
export default App