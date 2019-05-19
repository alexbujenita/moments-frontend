import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Authorize from './components/Authorize/Authorize';
import PageNotFound from './components/My404/My404';
import About from './components/About/About';
import Discover from './components/Discover/Discover';
import PhotographerProfile from './components/PhotographerProfile/PhotographerProfile';

import aws from './secrets'
import './App.css';

class App extends Component {


  render() {
    console.log(aws())
    return (
      <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='/about' exact component={About} />
        <Route path='/test' exact render={() =>  <h1 onClick={()=>this.props.history.push('/')}>TEST</h1>} />
        <Route path='/authorize' exact component={Authorize} />
        <Route path='/discover' exact component={Discover} />
        <Route path='/photographer/:id' exact component={PhotographerProfile} />
        <Route path='*' exact component={PageNotFound} />
      </Switch>
    )
  }
}
export default withRouter(App);
