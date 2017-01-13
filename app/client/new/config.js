import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import mobx from 'mobx'


import App from './components/app'
import GqlStore from '~/app/client/crossover/stores/gql-store'
import UIMessageStore from '~/app/client/crossover/stores/ui-message-store'
import UIRouteStore from '~/app/client/crossover/stores/ui-route-store'
import UIFormStore from '~/app/client/crossover/stores/ui-form-store'
import ProjectStore from './stores/project-store'
import ProjectModel from './stores/project-model'


const api = Axios.create({
  headers: {
    'X-CSRF-Token': getCSRFToken(),
  }
})

let app = {
  stores: {},
  settings: {}
}

app.settings.gqlUrl = 'http://localhost:3060/api/gql'
app.settings.api = api

app.stores.uiRouteStore = new UIRouteStore()
app.stores.gqlStore = new GqlStore(app)
app.stores.uiMessageStore = new UIMessageStore(app)
app.stores.projectStore = new ProjectStore(app, {api: api})
app.stores.uiFormStore = new UIFormStore(app)


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
