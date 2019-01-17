import React, { Component } from 'react';
import { Switch, Redirect, Route, Link, withRouter } from 'react-router-dom';
import { requireAuth } from '../actions/auth';
import Authentication from './authentication';

class Register extends Component {
  state = { user: null }

  componentWillMount() {
    requireAuth().
      then(
        user => this.setState( { user: user } )
      ).
      catch(
        error => console.log( error )
      );
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
