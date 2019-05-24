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
    const {
      aws_url,
      caption,
      name,
    } = this.props.photo;

    const { backId, photographerId } = this.props
    return (
      <div className="profile-photo column">
        <figure>
          <a href={aws_url} target="_blank" rel="noopener noreferrer">
            <img src={aws_url} alt="From profile" style={{ width: "100%" }} />
          </a>
          <figcaption className="caption-name">{name}</figcaption>
          <figcaption className="caption-description">{caption}</figcaption>
        </figure>
      { backId && backId === photographerId && 
        <button className="delete" type="button" onClick={this.deletePhoto}>DELETE</button>}
      </div>
    );
  }
}

export default ProfilePhoto;
