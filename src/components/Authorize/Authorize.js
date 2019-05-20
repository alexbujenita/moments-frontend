import React, { Component } from 'react'
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import "./Authorize.css";

class Authorize extends Component {

  state = {
    decision: ''
  }

  handleClick = event => this.setState({decision: event.target.id})
  cancelSelection = () => this.setState({decision: ''})

  displayForm = () => {
    const { decision } = this.state
    if(decision === "logmein") {
      return (
        <div>
          <Login />
          <button onClick={this.cancelSelection}>Cancel</button>
        </div>
      )
    } else if(decision === "signmeup") {
      return (
        <div>
          <Signup />
          <button onClick={this.cancelSelection}>Cancel</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="authorize">
        <h1>HI</h1>
        <button onClick={this.handleClick} id="logmein">I want to Login</button>
        <button onClick={this.handleClick} id="signmeup">I want to SignUp</button>
        {this.displayForm()}
      </div>
    )
  }
}

export default Authorize