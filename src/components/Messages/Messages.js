import React, { Component } from 'react';
import Message from '../Message/Message';

import './Messages.css'

class Messages extends Component {

  state = {
    hidden: true
  }

  handleClick = event => {
    this.setState({
      hidden: !this.state.hidden
    })
  }

  render() {
    const { markAsSeen } = this.props
    return (
      <div className="message-container">
        {
          this.props.messages.map(message => <Message
                      hidden={this.state.hidden}
                      key={message.id}
                      message={message}
                      markAsSeen={markAsSeen} /> )
        }
        <div>
          <h3>Personal messages</h3>
          <span>Hide seen?</span><input  type='checkbox' checked={this.state.hidden} onChange={this.handleClick} />
        </div>
      </div>
    )
  }
}

export default Messages;