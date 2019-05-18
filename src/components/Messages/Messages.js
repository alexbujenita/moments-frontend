import React, { Component } from 'react';
import Message from '../Message/Message';

class Messages extends Component {

  render() {
    return (
      <div className="message-container">
        {
          this.props.messages.map(message => <Message message={message} /> )
        }
      </div>
    )
  }
}

export default Messages;