import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthComponentSwitch from './authComponentSwitch';
import ExistingUserForm from '../components/forms/existingUserForm';
import NewUserForm from '../components/forms/newUserForm';

import { requireAuth, signIn, signUp } from '../actions/auth';

const formErrors = ( errors ) => {
  return Object.keys( errors ).length  > 0 ;
};

const DEFAULT_STATE = {
  newUser: false,
  loggedIn: false
};

class Register extends Component {
  state = DEFAULT_STATE;

  componentWillMount() {
    requireAuth().
      then(
        user => this.setState( { loggedIn: true } )
      ).
      catch(
        error => error
      );
  }

  toggleComponent() {
    var newState = this.state;
    newState.newUser = !newState.newUser;
    this.setState( newState );
  };

  setLoggedIn( user ) {
    this.setState( { loggedIn: true } );
  };

  render() {
    const { loggedIn, newUser, user, errors } = this.state;

    if ( !loggedIn ) {
      return(
        <div className="component-main">
          <div className="authentication-container">
            <AuthComponentSwitch newUser={ newUser } toggleComponent={ this.toggleComponent.bind( this ) } />
            <NewUserForm newUser={ newUser } setLoggedIn={ this.setLoggedIn.bind( this ) } />
            <ExistingUserForm newUser={ newUser } setLoggedIn={ this.setLoggedIn.bind( this ) } />
          </div>
        </div>
      )
    } else {
      return( <Redirect to="/workouts"/> );
    }
  }
};

export default Register;
