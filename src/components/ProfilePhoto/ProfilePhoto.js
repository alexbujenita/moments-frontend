import React, { Component } from "react";
import "./ProfilePhoto.css";

class ProfilePhoto extends Component {
  render() {
    console.log(this.props.photo);
    const {
      aws_url,
      aws_filename,
      caption,
      name,
      id,
      user_id
    } = this.props.photo;

    return (
      <div className="profile-photo column">
        <figure>
          <a href={aws_url} target="_blank" rel="noopener noreferrer">
            <img src={aws_url} alt="From profile" style={{ width: "100%" }} />
          </a>
          <figcaption>{name}</figcaption>
          <figcaption>{caption}</figcaption>
        </figure>
      </div>
    );
  }
}

export default ProfilePhoto;
