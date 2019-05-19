import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => (
  <div className="header">
     <Link to="/">
        <p>HOME</p>
      </Link>
      <Link to="/discover">
        <p>Discover</p>
      </Link>
  </div>
)