import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import mobx from 'mobx'


import App from './components/app'
import GqlStore from '../crossover/stores/gql-store'
import UIMessageStore from '../crossover/stores/ui-message-store'
import UIRouteStore from '../crossover/stores/ui-route-store'
import UIFormStore from '../crossover/stores/ui-form-store'
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


app.uiRouteStore = new UIRouteStore(app)
app.gqlStore = new GqlStore(app)
app.gqlUrl = 'http://localhost:3060/api/gql'
app.uiMessageStore = new UIMessageStore(app)
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