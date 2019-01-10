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

    this.setUser = this.setUser.bind( this );
    this.setWorkouts = this.setWorkouts.bind( this );
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

          <Route exact path="/workout">

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
            if ( this.state.user ) {
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
            if ( this.state.user ) {
              return(
                <WorkoutBuilder { ...props } user={ this.state.user }/>
              );
            } else {
              return(
                <Redirect to="/register" />
              )
            }
          }
        } />
      </Switch>
    );
  }
}
export default withRouter( App );
