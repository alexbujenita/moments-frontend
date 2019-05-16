import React from "react";
import axios from "axios";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namesign: "",
      emailsign: "",
      passwordsign: "",
      passconf: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.createUserAccount = this.createUserAccount.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  createUserAccount(event) {
    const {
      passwordsign: password,
      passconf: conf,
      namesign: name,
      emailsign: email
    } = this.state;
    event.preventDefault();

    if (password !== conf) {
      alert("The password and the confirmation don't match");
    } else {
      axios
        .post("http://localhost:3000/users/create", { name, email, password })
        .then(resp => {
          localStorage.setItem("token", resp.data.jwt);
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <form onSubmit={this.createUserAccount}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="namesign" onChange={this.handleChange} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="emailsign" onChange={this.handleChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="passwordsign" onChange={this.handleChange} />
        <label htmlFor="passconf">Password confirmation:</label>
        <input type="password" id="passconf" onChange={this.handleChange} />
        <button>Create account</button>
      </form>
    );
  }
}

export default Signup;
