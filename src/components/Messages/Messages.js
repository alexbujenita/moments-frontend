import React, { Component } from 'react';
import Message from '../Message/Message';

class Messages extends Component {

  render() {
    const { markAsSeen } = this.props
    return (
      <div className="message-container">
        {
          this.props.messages.map(message => <Message key={message.id} message={message} markAsSeen={markAsSeen} /> )
        }
      </div>
    )
  }
}

export default Messages;