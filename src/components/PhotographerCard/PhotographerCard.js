import React, { Component } from 'react'

import './PhotographerCard.css'


class PhotographerCard extends Component {

  

  render() {
    const { name, instagram, flickr, avatar, bio } = this.props.photographer
    return (
<div className="box">
      <div className="card">
        <div className="imgBx">
            <img src={avatar} alt="images" />
        </div>
        <div className="details">
            <h2>{name}<br /><span>Director<a href={instagram} target="_blank" ><img alt="insta" src="https://localglimpse.com/wp-content/uploads/2017/03/Instagram.png" /></a></span></h2>
        </div>
      </div>
       </div>
     )
  }
}


export default PhotographerCard
/* 
<div className='photographer-card'>
        { name && <h2>{name}</h2> }
        <p>Instagram:</p>
        { instagram && <a href={instagram} target='_blank'>insta</a> }
        <p>Flickr</p>
        { flickr && <a href={flickr} target='_blank'>Flickr</a> }
        { avatar && <img src={avatar}  alt="photographer's profile" /> }
        { bio && <i><p>{bio}</p></i> }
      </div> */