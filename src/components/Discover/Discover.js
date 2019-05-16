import React, { Component } from "react";
import axios from "axios";

import PhotographerCard from "../PhotographerCard/PhotographerCard";

class Discover extends Component {
  state = {
    photographers: []
  };

  componentDidMount() {
    axios.get("http://localhost:3000/users/all").then(resp => {
      const { data: photographers } = resp;
      this.setState({
        photographers
      });
    });
  }

  render() {
    const { photographers } = this.state
    return (
      <div className="discover">
        <h1>
          Here will go some information about the page, and also the
          photographer's cards.
        </h1>
        { photographers.map( photographer => <PhotographerCard key={photographer.id} photographer={photographer} /> ) }
      </div>
    );
  }
}

export default Discover;
