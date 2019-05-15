import React, { Component } from 'react'

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
          <h1>LOGIN</h1>
          <button onClick={this.cancelSelection}>Cancel</button>
        </div>
      )
    } else if(decision === "signmeup") {
      return (
        <div>
          <h1>SIGNUP</h1>
          <button onClick={this.cancelSelection}>Cancel</button>
        </div>
      )
    }
  }

  render() {
    const { decision } = this.state
    return (
      <div>
      <h1>HI</h1>
      <button onClick={this.handleClick} id="logmein">I want to Login</button>
      <button onClick={this.handleClick} id="signmeup">I want to SignUp</button>
      {/* {decision === "logmein" ? <h1>LOGIN</h1> 
      :
      decision === "signmeup" ? <h1>SIGNUP</h1>
      :
      null
       } */}
       {this.displayForm()}
      </div>
    )
  }
}

export default Authorize