import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./PhotographerCard.css";

import instaPic from "../../assets/media/insta.png";
import flickrPic from "../../assets/media/flickr.png";
import placeholderAvatar from '../../assets/media/placeholder-avatar.gif'

class PhotographerCard extends Component {
  render() {
    const { name, instagram, flickr, avatar, id } = this.props.photographer;
    return (
      <div className="box">
        <div className="card">
          <div className="imgBx">
            <Link to={`/photographer/${id}`}>
              <img src={avatar ? avatar : placeholderAvatar} alt="images" />
            </Link>
          </div>
          <div className="details">
            <h2>
              {name}
              <br />
              <span>
                { instagram && <a href={instagram} rel="noopener noreferrer" target="_blank">
                  <img alt="insta" src={instaPic} />
                </a>}
              </span>
              <span>
                { flickr && <a href={flickr} rel="noopener noreferrer" target="_blank">
                  <img alt="flickr" src={flickrPic} />
                </a>}
              </span>
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotographerCard;
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

// <h2>{name}<br /><span>
//       Director
//       <a href={instagram} rel="noopener noreferrer" target="_blank" ><img alt="insta" src={instaPic} /></a>
//       <a href={flickr} rel="noopener noreferrer" target="_blank" ><img alt="flickr" src={flickrPic} /></a>
//       </span>
//       </h2>
