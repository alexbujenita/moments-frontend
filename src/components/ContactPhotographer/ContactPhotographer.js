import React, { Component } from 'react';

class ContactPhotographer extends Component {

  state = {
    message: ''
  }

  handleChange = event => {
    this.setState({
      message: event.target.value
    })
  }

  sendMessage = event => {
    event.preventDefault();
    const { message: content } = this.state
    const { photographerId } = this.props
    console.log(content + photographerId)

    if(content.length < 10) {
      alert("Message has to be at least 10 characters");
      return;
    }
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content,
        user_id: photographerId
      })
    })
      .then(resp => resp.json())
      .then(conf => {
        if(conf.ok) {
          alert('Message sent');
          this.setState({
            message: ''
          })
          this.props.showHideContactForm();
        } else {
          alert('There was an error, please try again later.')
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="messenger">
        <form onSubmit={this.sendMessage}>
          <textarea
            id="message"
            rows="5"
            cols="70"
            placeholder="Write your message for the photographer..."
            value={this.state.message}
            onChange={this.handleChange}
            maxLength="1000"
            />
          <button>Send message</button>
        </form>
      </div>
    )
  }
}

export default ContactPhotographer