import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import './LandingPage.css'

class LandingPage extends Component {


  render() {
    return (
      <div className="landing-page">
        <Link to='/authorize'><button>Login</button></Link>
        <h1 id="title">Moments</h1>
      </div>
    )
  }
}

export default LandingPage;