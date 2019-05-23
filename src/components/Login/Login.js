import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'

import './Login.css'

class Login extends Component {

  state = {
    email: '',
    password: '',
    error: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      error: false
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/auth/create', this.state)
      .then(resp => {
        const { data } = resp
        console.log(data)
        if(data.error) {
          this.setState({error: true})
        } else {
          localStorage.setItem("token", data.jwt);
          this.props.history.push(`/photographer/${data.user_id}`)
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { email, password } = this.state
    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={this.handleChange} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={this.handleChange} />
          <button className="green-button">Login</button>
        </form>
        { this.state.error && <i><h4 style={{color: 'red'}}>Wrong Username or Password. <b>Please try again</b></h4></i> }
      </div>
    )
  }
}

export default withRouter(Login)