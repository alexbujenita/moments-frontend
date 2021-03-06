import React, { Component } from "react";
import "./ContactPhotographer.css";
class ContactPhotographer extends Component {
  state = {
    message: "",
    email: ""
  };

  handleChange = event => {
    if (event.target.name === "email") {
      this.setState({ email: event.target.value });
    } else {
      this.setState({
        message: event.target.value
      });
    }
  };

  sendMessage = event => {
    event.preventDefault();
    const { message: content, email } = this.state;
    const { photographerId } = this.props;
    console.log(content + photographerId);

    if (content.length < 10) {
      alert("Message has to be at least 10 characters");
      return;
    }
    if (email.length < 3) {
      alert("Please let the photographer know your email address!");
      return;
    }
    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content,
        email,
        user_id: photographerId
      })
    })
      .then(resp => resp.json())
      .then(conf => {
        if (conf.ok) {
          alert("Message sent");
          this.setState({
            message: ""
          });
          this.props.showHideContactForm();
        } else {
          alert("There was an error, please try again later.");
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="messenger">
        <form onSubmit={this.sendMessage}>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Your email here..."
          />
          <textarea
            id="message"
            rows="5"
            cols="70"
            placeholder="Write your message for the photographer..."
            value={this.state.message}
            onChange={this.handleChange}
            maxLength="1000"
          />
          <div className="up-container">
            <button className="edit-btn">Send message</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactPhotographer;
