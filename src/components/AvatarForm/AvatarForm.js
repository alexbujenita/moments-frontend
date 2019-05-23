import React, { Component } from "react";

import S3 from "aws-s3";
import aws from "../../secrets.js";

class AvatarForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    if (!event.target.avatarfile.files[0]) {
      alert("Please select your new avatar");
      return;
    }
    const S3Client = new S3(aws());

    S3Client.uploadFile(event.target.avatarfile.files[0]).then(resp => {
      const { key: avatar_filename, location: avatar } = resp;
      this.props.changeAvatar(avatar_filename, avatar);
      if (this.props.oldAvatar) {
        S3Client.deleteFile(this.props.oldAvatar);
      }
    });
  };

  render() {
    return (
      <form className="avatar-uploader" onSubmit={this.handleSubmit}>
        <input
          type="file"
          id="avatarfile"
          accept="image/png, image/jpeg, image/gif, image/jpg"
        />
        <div className="up-container">
          <button className="edit-btn">Change avatar</button>
        </div>
      </form>
    );
  }
}

export default AvatarForm;
