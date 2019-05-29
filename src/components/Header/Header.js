import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import "./Header.css";

function getToken() {
  return localStorage.getItem("token");
}

class Header extends React.Component {
  state = {
    userId: null
  };

  componentDidMount() {
    const token = this.getToken();
    if (token) {
      fetch("http://localhost:3000/auth/show", {
        method: "GET",
        headers: { Authorization: token }
      })
        .then(r => r.json())
        .then(u => this.setState({ userId: u.user_id }));
    }
  }
  getToken = () => localStorage.getItem("token");

  render() {
    return (
      <div className="header">
        <Link className="button" to="/">
          <p>HOME</p>
        </Link>
        <Link className="button" to="/discover">
          <p>Discover</p>
        </Link>
        {getToken() && (
          <Link className="button" to="/">
            <p onClick={() => localStorage.clear()}>Logout</p>
          </Link>
        )}

        { getToken() && (
      <NavLink
        className="button"
        exact
        to={`/photographer/${this.state.userId}`}
        activeStyle={{color:"black"}}
        >
        <p>My Profile</p>
      </NavLink>
    ) }
      </div>
    );
  }
}

export default withRouter(Header)