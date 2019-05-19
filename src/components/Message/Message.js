import React, { Component } from 'react';

class Message extends Component {

  render() {
    const { message, markAsSeen } = this.props
    return (
      <div className="message">
        <p>{message.content}</p>
        {
          message.seen ? <p>Message seen</p> : <button onClick={() => markAsSeen(message.id)}>Mark as seen</button>
        }
      </div>
    )
  }
}

export default Message;