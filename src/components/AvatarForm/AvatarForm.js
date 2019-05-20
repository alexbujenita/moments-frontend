import React, { Component } from 'react';

import S3 from "aws-s3";
import aws from '../../secrets.js'


class AvatarForm extends Component {

  handleSubmit = event => {
    event.preventDefault();
    const S3Client = new S3(aws());
    
    S3Client.uploadFile(event.target.avatarfile.files[0])
      .then(resp => {
        const { key: avatar_filename, location: avatar } = resp;
        this.props.changeAvatar(avatar_filename, avatar);

        S3Client.deleteFile(this.props.oldAvatar);
      })
  }


  render() {
    return (
      <form className="avatar-uploader" onSubmit={this.handleSubmit}>
            <input type="file" id="avatarfile" />
            <button>Change avatar</button>
          </form>
    )
  }
}

export default AvatarForm;