import React, { Component } from 'react'
import { sample } from 'lodash'
import './Chat.css'

class Chat extends Component {
  render () {
    console.log(this.props)
    const { messages } = this.props
    let messagesList = []
    if (messages) {
      messagesList = messages.edges.map((elem) => {

        const classUser = `username-chat username-color-cyan`

        const { id, user, text } = elem.node
        return <p key={id}><span className={classUser}>{user.username}:</span> {text}</p>
      })
    }
    return (
      <div id='chat'>
        <div id='messages' className='fluorescent-panel scrollbar-magic'>
          {messagesList}
        </div>
        <div>
          <div id='input-message' contentEditable='true' className='fluorescent-panel'></div>
        </div>
      </div>
    )
  }
}

export default Chat
