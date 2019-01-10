import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Landing from './components/landing';
import Register from './components/register';

import Navigation from './components/navigation';
import Workouts from './components/workouts';
import User from './components/user';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      workouts: null
    };

    this.setUser = this.setUser.bind( this );
    this.setWorkouts = this.setWorkouts.bind( this );
  };

  setUser( user ) {
    this.setState(
      {
        user: user
      }
    );
  };

  setWorkouts( workouts ) {
    this.setState(
      {
        workouts: workouts
      }
    );
  };

  verifyAuth() {
    return this.state.user;
  }

  authenticateRouting() {
    if ( this.verifyAuth() ) {
      return(
        <div className="app-container">
          <Navigation/>

          <Route exact path="/workouts">
            <Workouts setWorkouts={ this.setWorkouts } user={ this.state.user } workouts={ this.state.workouts } />
          </Route>

          <Route exact path="/user" component={ User }/>
        </div>
      )
    } else {
      return(
        <div className="app-container">
          <Route exact path="/" component={ Landing }/>
          <Route exact path="/register">
            <Register setUser={ this.setUser }/>
          </Route>
        </div>
      );
    }
  };

  render() {
    return (
      <Router>
        { this.authenticateRouting() }
      </Router>
    );
  }
}
export default App;
