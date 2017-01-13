import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { BrowserRouter, Match, Miss, Link } from 'react-router'
import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools';

import app from '../config'
import Messages from './Messages'
import Projects from './Projects'
import RouteMonitor from '~/app/client/crossover/components/RouteMonitor'
import StateViewer from '~/app/client/crossover/components/StateViewer'



class App extends React.Component {

  render(){
    return (
      <BrowserRouter>
        <Provider {...app.stores} >
          <div id="projector-app">
            <Match pattern="/" component={RouteMonitor} />


            <DevTools hightlightTimeout={60000} position={{ bottom: 0, right: 0 }} />


            <div id="projector-app-header">
              <Messages />
            </div>
            <div id="projector-app-content">

              { this.props.children }
              <Match pattern="/new/projects" component={Projects} />
            </div>
          </div>
        </Provider>
      </BrowserRouter>
    )
  }

}

// <StateViewer state={app} />

export default App
