import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Authorize from './components/Authorize/Authorize';
import PageNotFound from './components/My404/My404';
import About from './components/About/About';
import Discover from './components/Discover/Discover';
import { Header } from './components/Header/Header';
import PhotographerProfile from './components/PhotographerProfile/PhotographerProfile';

import './App.css';

class App extends Component {


  render() {
    return (
      <div className="container-page">
        <Header />
        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/about' exact component={About} />
          <Route path='/test' exact render={() =>  <h1 onClick={()=>this.props.history.push('/')}>TEST</h1>} />
          <Route path='/authorize' exact component={Authorize} />
          <Route path='/discover' exact component={Discover} />
          <Route path='/photographer/:id' exact component={PhotographerProfile} />
          <Route path='*' exact component={PageNotFound} />
        </Switch>
      </div>
    )
  }
}
export default withRouter(App);
