import mobx, { action, computed, observable, extendObservable } from 'mobx'
import _ from 'lodash'
import {filter, sortBy, map} from 'lodash/fp'


export default class MessageUIStore {
  @observable messages = []

  constructor(app, {} = {}){
    this.app = app
  }

  @action addMessage = (message, messageType='success', displayTime='default')=>{
    let messageObj = {message: message, messageType: messageType}
  
    if(displayTime){
      if(displayTime === 'default'){ displayTime = 5000}
      setTimeout(() => {
        this.removeMessage(messageObj)
      }, 5000)
    }

    this.messages.push(messageObj)
  }

  @action removeMessage = (message)=>{
    _.pull(this.messages, message)
  }

  @action clearMessages = ()=>{
    this.prepareState(this)
  }

}