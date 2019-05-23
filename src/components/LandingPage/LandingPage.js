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
        <h1 id="title" className="text-flicker-in-glow">Moments</h1>
        <div className="navigation">
          <Link to="/discover">
            <button>Discover</button>
          </Link>
          {this.logInOut()}
          <Link to="/about">
            <button>About</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
