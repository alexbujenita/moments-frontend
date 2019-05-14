import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import PageNotFound from './components/My404/My404';
import './App.css';

class App extends Component {


  render() {
    console.log(process.env.REACT_APP_AWS_CONFIG);
    
    return (
      <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='*' exact component={PageNotFound} />
      </Switch>
    )
  }
}
export default App;
