import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

// async function getUserId(token) {
//   const userId = await fetch('http://localhost:3000/auth/show', {
//     method: 'GET',
//     headers: {'Authorization': token}
//   })
//     .then(r => r.json())
//     .then(u => {
//     return  u.user_id
//     })
//     console.log(userId);
    
//   return userId
// }


function getToken() {
  return localStorage.getItem("token");
}

export const Header = () => (

  <div className="header">
    <Link to="/">
      <p>HOME</p>
    </Link>
    <Link to="/discover">
      <p>Discover</p>
    </Link>
    {getToken() && (
      <Link to="/">
        <p onClick={() => localStorage.clear()}>Logout</p>
      </Link>
    )}

    {/* { getToken() && (
      <Link to={`/photographer/${getUserId(getToken())}`}>
        <p>My Profile</p>
      </Link>
    ) } */}

  </div>
);
