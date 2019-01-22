import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { requireAuth } from '../actions/auth';

const defaultView = (
  <div className="component-main">
    <div className="welcome-container">
      <h1>Welcome to Swole Goal!</h1>
      <div className="copy">
        <span>This app is designed to help you save workouts.</span>
        <span>Click <i><Link to="/register">here</Link></i> to create an account and start building your workouts.</span>
      </div>
    </div>
  </div>
);

class Landing extends Component {
  state = { user: null };

  componentWillMount() {
    console.log( 'LANDING COMPONENT' );
    requireAuth().
      then(
        user => this.setState( { user: user } )
      ).
      catch(
        error => console.log( error )
      );
  };

  render() {
    if ( !this.state.user ) {
      return( defaultView );
    } else {
      return( <Redirect to="/workouts"/> );
    }
  }
};

export default Landing;
