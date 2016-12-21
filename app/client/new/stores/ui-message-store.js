import mobx, { action, computed, observable, autorun } from 'mobx'
import _ from 'lodash'


export default class UIMessageStore {
  @observable messages = []

  constructor(app, {} = {}){
    this.app = app
  }

  @action add = (message, messageType='success', displayTime)=>{
    let messageObj = {message: message, messageType: messageType}

    this.messages.push(messageObj)

    if(displayTime){
      // Remove the message after a set amount of time
      if(displayTime === 'default'){ displayTime = 5000}
      setTimeout(() => {
        this.remove(messageObj)
      }, 5000)
    } else {
      // Remove the message the next time the URL changes
      let runs = 0
      let disposer = autorun(() => {
        this.app.uiRouteStore.location
        if(runs > 0){
          this.clear()
          disposer()
          runs = 0
        }
        runs += 1
      })
    }
  }

  @action remove = (message)=>{
    _.pull(this.messages, message)
  }

  @action clear = ()=>{
    this.messages = []
  }

}
