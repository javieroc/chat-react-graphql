import React, { Component } from 'react'
import './Chat.css'

class Chat extends Component {
  render () {
    return (
      <div id='chat'>
        <div id='messages' className='fluorescent-panel'>
        </div>
        <div>
          <div id='input-message' contentEditable='true' className='fluorescent-panel'></div>
        </div>
      </div>
    )
  }
}

export default Chat
