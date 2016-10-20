import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router'


@inject('messageUIStore') @observer
class Messages extends React.Component {

  render(){
    let messages = this.props.messageUIStore.messages
    
    if(messages && messages.length > 0) {
      return(
        <div id="messages">
        {
          messages.map((message, index) => {
            return <div key={index} className={message.messageType}>{message.message}</div>
          })
        }
        </div>
    )} else {
      return(<span></span>)
    }
  }
}


export default Messages