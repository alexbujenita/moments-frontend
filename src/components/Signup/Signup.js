import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namesign: "",
      emailsign: "",
      passwordsign: "",
      passconf: "",
      hideProfile: true
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
      emailsign: email,
      hideProfile: hidden
    } = this.state;
    event.preventDefault();

    if (password !== conf) {
      alert("The password and the confirmation don't match");
    } else {
      axios
        .post("http://localhost:3000/users/create", {
          name,
          email,
          password,
          hidden
        })
        .then(resp => {
          localStorage.setItem("token", resp.data.jwt);
          this.props.history.push("/");
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const { hideProfile } = this.state;
    return (
      <div className="signup-form">
        <form onSubmit={this.createUserAccount}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="namesign"
            placeholder="Enter your name..."
            required
            minLength="3"
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="emailsign"
            placeholder="Enter your email..."
            required
            autoComplete="username"
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="passwordsign"
            autoComplete="current-password"
            required
            minLength="3"
            onChange={this.handleChange}
          />
          <label htmlFor="passconf">Password confirmation:</label>
          <input
            type="password"
            id="passconf"
            autoComplete="new-password"
            required
            minLength="3"
            onChange={this.handleChange}
          />
          <span>Hide account upon creation?</span>
          <input
            type="checkbox"
            checked={hideProfile}
            onChange={() => this.setState({ hideProfile: !hideProfile })}
          />
          <button className="green-button">Create account</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
