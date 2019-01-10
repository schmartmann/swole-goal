import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Landing from './components/landing';
import Register from './components/register';

import Navigation from './components/navigation';
import Workouts from './components/workouts';
import Exercises from './components/exercises';
import User from './components/user';

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
        <div>
          <Navigation/>
          <Route exact path="/workouts" component={ Workouts }/>
          <Route exact path="/exercises" component={ Exercises }/>
          <Route exact path="/user" component={ User }/>
        </div>
      )
    } else {
      return(
        <div>
          <Route exact path="/" component={ Landing }/>
          <Route exact path="/register" component={ Register }/>
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
