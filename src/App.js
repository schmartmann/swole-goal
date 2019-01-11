import React, { Component } from 'react';
import { Switch, Redirect, Route, Link, withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import Landing from './components/landing';
import Register from './components/register';

import Navigation from './components/navigation';
import Workouts from './components/workouts';
import User from './components/user';
import WorkoutBuilder from './components/workout_builder';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      workouts: null
    };

    this.setUser     = this.setUser.bind( this );
    this.setWorkouts = this.setWorkouts.bind( this );
    this.addWorkout  = this.addWorkout.bind( this );
  };

  componentDidUpdate( prevProps, prevState ) {
    if ( !prevState.user && this.state.user ) {
      this.props.history.push( '/workouts' );
    }
  }

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

  addWorkout( workout ) {
    var workouts = this.state.workouts;

    workouts.unshift( workout );

    this.setState(
      {
        workouts: workouts
      }
    );
  };

  verifyAuth() {
    return this.state.user;
  }

  render() {
    return(
      <Switch>
        <Route exact path="/" component={ Landing } />

        <Route
          path="/register"
          render={ props => <Register { ...props } setUser={ this.setUser } user={ this.state.user } /> }
        />

        <Route
          path="/workouts"
          render={ props => {
            if ( this.verifyAuth() ) {
              return(
                <Workouts { ...props }
                  user={ this.state.user }
                  workouts={ this.state.workouts }
                  setWorkouts={ this.setWorkouts }
                />
              );
            } else {
              return( <Redirect to="/register"/> );
            }
          }
        } />

        <Route
          path="/workout"
          render={ props => {
            if ( this.verifyAuth() ) {
              return(
                <WorkoutBuilder { ...props } user={ this.state.user } addWorkout={ this.addWorkout }/>
              );
            } else {
              return(
                <Redirect to="/register" />
              )
            }
          }
        } />

        <Route
          path="/user"
          render={ props => {
            if ( this.verifyAuth() ) {
              return(
                <User { ...props } user={ this.state.user }/>
              );
            } else {
              return( <Redirect to="/register"/> );
            }
          }
        } />
      </Switch>
    );
  }
}
export default withRouter( App );
