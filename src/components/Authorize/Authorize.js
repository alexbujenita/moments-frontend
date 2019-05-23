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
          <button className="cancelbtn" onClick={this.cancelSelection}>Cancel</button>
        </div>
      )
    } else if(decision === "signmeup") {
      return (
        <div>
          <Signup />
          <button className="cancelbtn" onClick={this.cancelSelection}>Cancel</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="authorize">
        <h1>
            If you already have an account with us, you just need to hit the login button.
        </h1>
        <h1>
          Otherwise why don't you create an account with us!? <br />
          It's free at the moment, so hurry up!
        </h1>
        <button className="green-button" onClick={this.handleClick} id="logmein">I want to Login</button>
        <button className="green-button" onClick={this.handleClick} id="signmeup">I want to SignUp</button>
        {this.displayForm()}
      </div>
    )
  }
}

export default Authorize