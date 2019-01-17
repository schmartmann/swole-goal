import React, { Component } from 'react';
import { Switch, Redirect, Route, Link, withRouter } from 'react-router-dom';
import { validateToken } from '../actions/auth';
import Authentication from './authentication';

class Register extends Component {
  state = { user: null }

  componentWillMount() {
    console.log( this.props );
    validateToken().then(
      user => {
        if ( user ) {
          this.setState(
            {
              user: user
            }
          );

          this.props.setUser(
            {
              user: user
            }
          );

          this.props.location.pathname = '/workouts';
        }
      }
    )
  }
  render() {
    if ( !this.state.user ) {
      return(
        <div className="component-main">
          <Authentication/>
        </div>
      )
    } else {
      return( <Redirect to="/workouts"/> );
    }
  }
};

export default Register;
