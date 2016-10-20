import Axios from 'axios'
import mobx from 'mobx'
import mobxstore from 'mobx-store'

//import AppUIStore from './stores/AppUIStore'
//import MessageUIStore from './stores/MessageUIStore'
//import Vessel from './stores/vessel'
//import VesselStore from './stores/VesselStore'

import AppUIStore from './stores/app-ui-store'
import MessageUIStore from './stores/message-ui-store'
import ProjectStore from './stores/project-store'

const api = Axios.create({
  headers: {
    'X-CSRF-Token': getCSRFToken(),
  }
})

let app = {
  api: api,
}

//app.AppUIStore = new AppUIStore(app, {currentYear: '2016', viewYear: '2016', coopName: window.settings.coopName, coopId: window.settings.coopId})
//app.MessageUIStore = new MessageUIStore(app)
//app.VesselStore = new VesselStore(app, {api: api, year: '2016'})

app.appUIStore = new AppUIStore(app)
app.messageUIStore = new MessageUIStore(app)
app.projectStore = new ProjectStore(app, {api: api})

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