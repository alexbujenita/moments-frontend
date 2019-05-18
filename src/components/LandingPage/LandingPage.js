import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";

class LandingPage extends Component {
  logInOut = () => {
    return !!localStorage.getItem("token") ? (
      <button onClick={this.logout}>Logout</button>
    ) : (
      <Link to="/authorize">
        <button>Login</button>
      </Link>
    );
  };

  logout = () => {
    localStorage.clear("token");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="landing-page">
        {this.logInOut()}
        <Link to="/discover">
          <button>Discover</button>
        </Link>
        <h1 id="title">Moments</h1>
      </div>
    );
  }
}

export default LandingPage;
