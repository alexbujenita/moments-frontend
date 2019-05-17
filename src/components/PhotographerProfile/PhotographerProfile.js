import React, { Component } from 'react'
import axios from 'axios'
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';

import './PhotographerProfile.css'
class PhotographerProfile extends Component {

  state = {
    photographer: {}
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/users/${this.props.match.params.id}`)
      .then(resp => {
        this.setState({
          photographer: resp.data
        })
      })
  }
  

  render() {
    console.log(this.props);
    const { avatar, avatar_filename, bio, email, flickr, id, instagram, name, photos } = this.state.photographer
    console.log(photos);
    
    return (
      <div className="profile-page">
        { name && <h1>{name}</h1> }
        <div className="profile-photos row">
          { photos && photos.length > 0 
          ?
           photos.map(photo => 
           <ProfilePhoto photo={photo} />) : 'no' }
        </div>
        { bio ? <p>{bio}</p> : <h2>NO BIO</h2> }
      </div>
    )
  }
}

export default PhotographerProfile