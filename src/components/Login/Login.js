import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'

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
          this.props.history.push('/')
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { email, password } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={this.handleChange} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={this.handleChange} />
          <button>Login</button>
        </form>
        { this.state.error && <h3>Wrong Username or Password</h3> }
      </div>
    )
  }
}

export default withRouter(Login)