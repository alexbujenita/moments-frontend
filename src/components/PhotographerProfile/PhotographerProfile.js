import React, { Component } from "react";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";
import ContactPhotographer from "../ContactPhotographer/ContactPhotographer";
import AvatarForm from "../AvatarForm/AvatarForm";
import Messages from "../Messages/Messages";
import Edit from "../Edit/Edit";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import axios from "axios";
import S3 from "aws-s3";

import aws from "../../secrets.js";

import placeholderAvatar from "../../assets/media/placeholder-avatar.gif";
import instaPic from "../../assets/media/insta.png";
import flickrPic from "../../assets/media/flickr.png";

import "./PhotographerProfile.css";
class PhotographerProfile extends Component {
  state = {
    photographer: {},
    hasAmountPhotos: 0,
    photoName: "",
    photoCaption: "",
    backId: null,
    showContact: false,
    showEdit: false,
    showAvatar: false,
    isLoading: false
  };

  componentDidMount() {
    this.getCurrentUser();

    axios
      .get(`http://localhost:3000/users/${this.props.match.params.id}`)
      .then(resp => {
        this.setState(
          {
            photographer: resp.data,
            hasAmountPhotos: resp.data.photos.length
          },
          window.scrollTo(0, 0)
        );
      });
  }

  // RANDOM LOADING DURATION

  rangeRandom = (min, max) => Math.random() * (max - min) + min;

  showHideContactForm = () => {
    this.setState({
      showContact: !this.state.showContact
    });
  };

  // EDIT
  showHideEdit = () => {
    this.setState({
      showEdit: !this.state.showEdit
    });
  };

  showHideEditButton = () => {
    if (this.state.backId !== this.state.photographer.id) {
      return;
    }
    return this.state.showEdit ? (
      <button className="cancel-btn" onClick={this.showHideEdit}>Cancel</button>
    ) : (
      <button className="edit-btn" onClick={this.showHideEdit}>Edit Profile</button>
    );
  };
  //

  // AVATAR
showHideAvatar = () => {
    this.setState({
      showAvatar: !this.state.showAvatar
    });
  };

  showHideAvatarButton = () => {
    if (this.state.backId !== this.state.photographer.id) {
      return;
    }
    return this.state.showAvatar ? (
      <button className="cancel-btn" onClick={this.showHideAvatar}>Cancel</button>
    ) : (
      <button className="edit-btn" onClick={this.showHideAvatar}>Edit Avatar</button>
    );
  };

  changeAvatar = (avatar_filename, avatar) => {
  this.setState({isLoading: true})
    fetch('http://localhost:3000/users/avatar', {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: this.state.photographer.id,
        avatar_filename,
        avatar
      })
    })
      .then(resp => resp.json())
      .then(photographer => {
        this.setState({
          photographer,
          hasAmountPhotos: photographer.photos ? photographer.photos.length : 0,
          showAvatar: false,
          isLoading: false
        })
      })
  }

  //

  showHideButton = () => {
    if (this.state.backId) {
      return;
    }
    return this.state.showContact ? (
      <button className="cancel-btn" onClick={this.showHideContactForm}>Cancel</button>
    ) : (
      <button className="edit-btn" onClick={this.showHideContactForm}>Contact photographer</button>
    );
  };

  getCurrentUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/auth/show", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
        .then(resp => resp.json())
        .then(user => {
          this.setState({
            backId: user.user_id
          });
        })
        .catch(err => console.log(err));
    }
  };

  markAsSeen = messageId => {
    axios.get(`http://localhost:3000/messages/${messageId}`).then(resp => {
      this.setState({
        photographer: resp.data
      });
    });
  };

  deletePhotoFromBack = id => {
    this.setState({isLoading: true})
    setTimeout(() => fetch(`http://localhost:3000/photos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(resp => resp.json())
      .then(photographer => {
        this.setState({
          photographer,
          hasAmountPhotos: photographer.photos.length,
          isLoading: false
        });
      })
      .catch(err => console.log(err)), 800)
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!event.target.file.files[0]) {
      alert('Please select a photo to upload')
      return;
    }
    this.setState({isLoading: true})
    const S3Client = new S3(aws());

    const { id: user_id } = this.state.photographer;
    const { photoName: name, photoCaption: caption } = this.state;

    S3Client.uploadFile(event.target.file.files[0])
      .then(resp => {
        const { key: aws_filename, location: aws_url } = resp;
        fetch("http://localhost:3000/photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
              hasAmountPhotos: photographer.photos.length,
              isLoading: false,
              photoCaption: '',
              photoName: ''
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  // EDIT PROFILE

  updateProfile = (id, name, email, flickr, instagram, bio) => {
    this.setState({isLoading: true})
    setTimeout( () => fetch("http://localhost:3000/users/edit", {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: id,
        name,
        email,
        flickr,
        instagram,
        bio
      })
    })
      .then(resp => resp.json())
      .then(photographer => {
        this.setState({
          photographer,
          hasAmountPhotos: photographer.photos.length,
          showEdit: false,
          isLoading: false
        })
      }), this.rangeRandom(400, 2000))
  }


  render() {
    const {
      avatar,
      bio,
      flickr,
      id,
      instagram,
      name,
      photos,
      messages
    } = this.state.photographer;
    const { backId, hasAmountPhotos, showEdit, showAvatar, isLoading } = this.state;
    const showForm = backId && backId === id && hasAmountPhotos < 6;

    return (
       isLoading ?
        (<LoadingComponent />)
        :
      (<div className="profile-page">
        {this.showHideButton()}
        {this.state.showContact && (
          <ContactPhotographer
            photographerId={id}
            showHideContactForm={this.showHideContactForm}
          />
        )}
        <div className="profile">
          <div className="profile-avatar">
            <img alt="avatar" src={avatar ? avatar : placeholderAvatar} />
          </div>
          <div className="profile-bio">
            {name && <h1>{name}</h1>}
            {bio ? <p>{bio}</p> : <p>NO BIO</p>}
            <div className="social-link">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer">
                  <img alt="Instagram" src={instaPic} />
                  <span>Instagram</span>
                </a>
              )}
              {flickr && (
                <a href={flickr} target="_blank" rel="noopener noreferrer">
                  <img alt="flickr" src={flickrPic} />
                  <span>Flickr</span>
                </a>
              )}
            </div>
            <div>
          {this.showHideEditButton()}

          {backId === id && showEdit && (
            <Edit
                  photographer={this.state.photographer}
                  updateProfile={this.updateProfile}
                  />
          )}
        </div>
        
          {/* CHANGE AVATAR  */}
        {this.showHideAvatarButton()}
        { backId === id && showAvatar &&
         <div>
          <AvatarForm
            oldAvatar={this.state.photographer.avatar_filename}
            changeAvatar={this.changeAvatar}
            />
        </div>}

        {/* SHOW/HIDE PROFILE */}
        
        

          </div>
        </div>
        {showForm && (
          <form className="photo-uploader" onSubmit={this.handleSubmit}>
            <h4>You still have {6-hasAmountPhotos} more {(6-hasAmountPhotos === 1) ? 'photo' : 'photos'} to upload</h4>
            <input
              type="file"
              id="file"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              />
            <label htmlFor="photo-name">
              <input
                type="text"
                id="photoName"
                placeholder="Photo name..."
                value={this.state.photoName}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="photo-caption">
              <input
                type="text"
                id="photoCaption"
                placeholder="Photo caption..."
                value={this.state.photoCaption}
                onChange={this.handleChange}
              />
            </label>
            <div className="up-container">
              <button className="upload-btn">Upload photo</button>
            </div>
          </form>
        )}
        <div className="profile-photos">
          {photos && photos.length > 0 ? (
            photos.map(photo => (
              <ProfilePhoto
                key={photo.id}
                deletePhotoFromBack={this.deletePhotoFromBack}
                photo={photo}
                photographerId={id}
                backId={backId}
              />
            ))
          ) : (
            <p>No photos to show</p>
          )}
        </div>

        {backId === id && messages && (
          <Messages messages={messages} markAsSeen={this.markAsSeen} />
        )}
      </div>)
    );
  }
}

export default PhotographerProfile;
