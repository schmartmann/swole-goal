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
  user: null
};

class Register extends Component {
  state = DEFAULT_STATE;

  componentWillMount() {
    requireAuth().
      then(
        user => {
          // if method returns user, consider user logged in
          if ( user ) {
            this.setState( { user: user } );
            this.props.history.push( '/workouts' );
          }
        }
      ).
      catch(
        error => error
      );
  }

  componentDidUpdate( prevProps, prevState ) {
    const { user } = this.state;

    if ( user ) {
      this.props.history.push( '/workouts' );
    }
  }

  setUser( user ) {
    this.setState( { user: user } );
  }

  toggleComponent() {
    var newState = this.state;
    newState.newUser = !newState.newUser;
    this.setState( newState );
  };

  render() {
    const { newUser, user, errors } = this.state;

    return(
      <div className="component-main">
        <div className="authentication-container">
          <AuthComponentSwitch newUser={ newUser } toggleComponent={ this.toggleComponent.bind( this ) } />
          <NewUserForm newUser={ newUser } setUser={ this.setUser.bind( this ) } />
          <ExistingUserForm newUser={ newUser } setUser={ this.setUser.bind( this ) } />
        </div>
      </div>
    );
  }
};

export default Register;
