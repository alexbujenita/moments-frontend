import React, { Component } from 'react';
import './Message.css'

class Message extends Component {

  render() {
    const { message, markAsSeen, hidden } = this.props
    return (
      <div
        className={ message.seen ? 'message-seen' : 'message' }
        style={message.seen && hidden ? {display: 'none'} : {display: ''} }>
        <p>{message.content}</p>
        {
          message.seen ? <p>Message seen</p> : <button onClick={() => markAsSeen(message.id)}>Mark as seen</button>
        }
      </div>
    )
  }
}

export default Message;