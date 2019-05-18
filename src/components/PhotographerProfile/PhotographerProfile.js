import React, { Component } from 'react'
import axios from 'axios'
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import S3 from 'aws-s3'

import aws from '../../secrets.js'

import './PhotographerProfile.css'
class PhotographerProfile extends Component {

  state = {
    photographer: {},
    hasAmountPhotos: 0,
    photoName: '',
    photoCaption: '',
    backId: null
  }

  componentDidMount() {

    this.getCurrentUser();

    axios.get(`http://localhost:3000/users/${this.props.match.params.id}`)
      .then(resp => {
        this.setState({
          photographer: resp.data,
          hasAmountPhotos: resp.data.photos.length
        })
      })
  }

  getCurrentUser = () => {
    const token = localStorage.getItem('token')
    if(token) {
      fetch('http://localhost:3000/auth/show', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
        .then(resp => resp.json())
        .then(user => {
          this.setState({
            backId: user.user_id
          })
        })
        .catch(err => console.log(err))
    }
  }

  deletePhotoFromBack = id => {
    return fetch(`http://localhost:3000/photos/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(photographer => {
      this.setState({
        photographer,
        hasAmountPhotos: photographer.photos.length
      })
    })
    .catch(err => console.log(err))
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(event.target.file.files[0]);
    const S3Client = new S3(aws())

    const { id: user_id } = this.state.photographer
    const { photoName: name, photoCaption: caption } = this.state

    S3Client.uploadFile(event.target.file.files[0])
      .then(resp => {
        const { key: aws_filename, location: aws_url } = resp
        console.log(resp)
        fetch('http://localhost:3000/photos', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            user_id,
            name,
            caption,
            aws_filename,
            aws_url
          })
        })
          .then(resp => resp.json())
          .then(photographer => {
            this.setState({
              photographer,
              hasAmountPhotos: photographer.photos.length
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    
  }

  handleChange = event => {
    console.log(event.target.id);
    
    this.setState({
      [event.target.id]: event.target.value
    })
  }


  

  render() {
    console.log(this.props);
    console.log(aws());
    const { avatar, avatar_filename, bio, email, flickr, id, instagram, name, photos } = this.state.photographer
    const { backId } = this.state
    console.log(photos);
    
    return (
      <div className="profile-page">
        { name && <h1>{name}</h1> }
        <div className="profile-avatar">
          <img alt="avatar" src={avatar} />
        </div>
        <div className="profile-photos row">
          { photos && photos.length > 0 
          ?
           photos.map(photo => 
           <ProfilePhoto
            deletePhotoFromBack={this.deletePhotoFromBack}
            photo={photo}
            photographerId={id}
            backId={backId}
            />) : 'no' }
        </div>
        { bio ? <p>{bio}</p> : <h2>NO BIO</h2> }
{ backId && backId === id &&
        <form className="photo-uploader" onSubmit={this.handleSubmit}>
          <input type="file" id="file" />
          <label htmlFor="photo-name">
            <input type="text" id="photoName" placeholder="Photo name..." value={this.state.photoName} onChange={this.handleChange} />
          </label>
          <label htmlFor="photo-caption">
            <input type="text" id="photoCaption" placeholder="Photo caption..." value={this.state.photoCaption} onChange={this.handleChange} />
          </label>
          <button>Upload photo</button>
        </form> }

      </div>
    )
  }
}

export default PhotographerProfile