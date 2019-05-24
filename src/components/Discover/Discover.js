import React, { Component } from "react";
import axios from "axios";

import PhotographerCard from "../PhotographerCard/PhotographerCard";
import './Discover.css';

class Discover extends Component {
  state = {
    filtered: []
  };

  componentDidMount() {
    axios.get("http://localhost:3000/users/all").then(resp => {
      const { data: photographers } = resp;
      this.setState({
        filtered: photographers.filter( p => !p.hidden )
      });
    });
  }


  render() {
    const { filtered } = this.state
    return (
      <div className="discover">
        <h1>
          Here will go some information about the page, and also the
          photographer's cards.
        </h1>
        <div className="photographers">
          { filtered.map( photographer => 
              <PhotographerCard
              key={photographer.id}
              photographer={photographer}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Discover;
