import React, { Component } from 'react';


class Edit extends Component {

  state = {
    photographer: {},
    name: '',
    email: '',
    flickr: '',
    instagram: '',
    bio: ''
  }

  componentDidMount() {
    const { photographer } = this.props
    this.setState({
      photographer,
      name: photographer.name,
      email: photographer.email,
      instagram: photographer.instagram,
      flickr: photographer.flickr,
      bio: photographer.bio
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { name, email,flickr, instagram, bio } = this.state
    const { id } = this.state.photographer

    this.props.updateProfile(id, name, email, flickr, instagram, bio);
  }


  render() {
    const { name, email, flickr, instagram, bio } = this.state
    return (
      <div className="edit-profile">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={this.handleChange}  />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={email} onChange={this.handleChange}  />
          </div>
          <div>
            <label htmlFor="flickr">Flickr account:</label>
            <input type="text" id="flickr" value={flickr} onChange={this.handleChange}  />
          </div>
          <div>
            <label htmlFor="instagram">Instagram account:</label>
            <input type="text" id="instagram" value={instagram} onChange={this.handleChange}  />
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea value={bio} id="bio" rows="4" cols="50" onChange={this.handleChange} ></textarea>
          </div>
          <div className="up-container">
            <button className="edit-btn">Submit changes</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Edit;