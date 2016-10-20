import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import mobx from 'mobx'
import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools';
import app from './config'

import App from './components/App'
import Projects from './components/Projects'
import Project from './components/Project'


function saveLocation(nextState){
  app.appUIStore.location = nextState.location
  app.appUIStore.routeParams = nextState.params
}


ReactDOM.render(
  
    <Provider {...app} >
      <div>
        <DevTools hightlightTimeout={60000} position={{ bottom: 0, right: 0 }} />
        <Router history={browserHistory}>
          <Route path="new/" component={App}>
            <Route path="projects" component={Projects} onEnter={(nextState) => { 
              saveLocation(nextState)
              //app.VesselStore.load({query: {year: nextState.params.year}})
            }}>
              <Route path=":projectId" component={Project} onEnter={(nextState) => {
                saveLocation(nextState)
                //let loaded = app.VesselStore.isLoaded({id: nextState.params.vesselId, year: nextState.params.year, props: 
                //  ['id','name','position','hidden','adfg','fcvp','callLetters','skipper','email','notes']
                //})
                //if(!loaded){
                //  app.VesselStore.load({id: nextState.params.vesselId, query: {year: nextState.params.year}})
                //}
               }} />
            </Route>

            <Route path="*" component={()=>{return(<div>Not Found</div>)}}/>

          </Route>
        </Router>
      </div>
    </Provider>
  ,
  document.getElementById('appcontainer')
)