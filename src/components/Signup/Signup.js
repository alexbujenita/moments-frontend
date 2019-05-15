import React from 'react'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      namesign: '',
      emailsign: '',
      passwordsign: '',
      passconf: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  createUserAccount (event) {
    event.preventDefault();
    
  }


  render() {
    return (
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="namesign" onChange={this.handleChange} />
        <label htmlFor="email">Email:</label>
        <input type="text" id="emailsign" onChange={this.handleChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="passwordsign" onChange={this.handleChange} />
        <label htmlFor="passconf">Password confirmation:</label>
        <input type="password" id="passconf" onChange={this.handleChange} />
        <button>Create account</button>
      </form>
    )
  }
}

export default Signup