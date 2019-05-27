import React, { Component } from "react";
import "./Message.css";

class Message extends Component {
  render() {
    const { message, markAsSeen, hidden } = this.props;
    return (
      <div
        className={message.seen ? "message-seen" : "message"}
        style={message.seen && hidden ? { display: "none" } : { display: "" }}
      >
        <h5 className="from">
          From: <a href={`mailto:${message.email}`}>{message.email}</a>
        </h5>
        <p>{message.content}</p>
        {message.seen ? (
          <p>Message seen</p>
        ) : (
          <button onClick={() => markAsSeen(message.id)}>Mark as seen</button>
        )}
      </div>
    );
  }
}

export default Message;
