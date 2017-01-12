import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import mobx from 'mobx'
//import mobxstore from 'mobx-store'

//import AppUIStore from './stores/AppUIStore'
//import UIMessageStore from './stores/UIMessageStore'
//import Vessel from './stores/vessel'
//import VesselStore from './stores/VesselStore'

import App from './components/app'
import GqlStore from './stores/gql-store'

import AppUIStore from './stores/app-ui-store'
import UIMessageStore from './stores/ui-message-store'
import UIRouteStore from './stores/ui-route-store'
import UIFormStore from './stores/ui-form-store'
import ProjectStore from './stores/project-store'
import ProjectModel from './stores/project-model'


const api = Axios.create({
  headers: {
    'X-CSRF-Token': getCSRFToken(),
  }
})

let app = {
  api: api,
}

//app.AppUIStore = new AppUIStore(app, {currentYear: '2016', viewYear: '2016', coopName: window.settings.coopName, coopId: window.settings.coopId})
//app.UIMessageStore = new UIMessageStore(app)
//app.VesselStore = new VesselStore(app, {api: api, year: '2016'})

app.uiRouteStore = new UIRouteStore(app)
app.gqlStore = new GqlStore(app)
app.gqlUrl = 'http://localhost:3060/api/gql'
app.appUIStore = new AppUIStore(app)
app.uiMessageStore = new UIMessageStore(app)

//app.projectStore = new ProjectStore(app, {api: api})
app.projectStore = new ProjectStore(app, {api: api})

app.uiFormStore = new UIFormStore(app)
app.ProjectModel = ProjectModel


window.app = app
export default app




function getCSRFToken(){
  const metas = document.getElementsByTagName('meta')
  for(let i = 0; i < metas.length; i++){
    let meta = metas[i]
    if(meta.getAttribute('name') === 'csrf-token'){
      return meta.getAttribute('content')
    }
  }
}


ReactDOM.render(<App/>, document.getElementById('appcontainer'))