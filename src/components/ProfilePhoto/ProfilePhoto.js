import React, { Component } from "react";
import "./ProfilePhoto.css";

import aws from '../../secrets'
import S3 from 'aws-s3'

class ProfilePhoto extends Component {


  deletePhoto = event => {
    event.preventDefault();
    const { id, aws_filename } = this.props.photo
    const S3Client = new S3(aws())

    S3Client.deleteFile(aws_filename)
    .then(response => console.log(response))
    .catch(err => console.error(err))

    this.props.deletePhotoFromBack(id)
      
  }


  render() {
    console.log(this.props.photo);
    const {
      aws_url,
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
        <button onClick={this.deletePhoto}>DEL</button>
      </div>
    );
  }
}

export default ProfilePhoto;