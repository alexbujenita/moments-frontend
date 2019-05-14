import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import PageNotFound from './components/My404/My404';

import aws from './secrets'
import './App.css';

class App extends Component {


  render() {
    console.log(aws())
    return (
      <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='/test' exact render={() =>  <h1 onClick={()=>this.props.history.push('/')}>TEST</h1>} />
        <Route path='*' exact component={PageNotFound} />
      </Switch>
    )
  }
}
export default withRouter(App);
