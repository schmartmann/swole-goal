import React, { Component } from 'react';
import NewUser from './forms/new_user';
import ExistingUser from './forms/existing_user';
import { signIn, signUp } from '../actions/auth';

class Authentication extends Component {
  constructor() {
    super();

    this.state = {
      newUser: false
    };

    this.setNewUser      = this.setNewUser.bind( this );
    this.setExistingUser = this.setExistingUser.bind( this );
    this.signUserIn      = this.signUserIn.bind( this );
  }

  setNewUser() {
    this.setState(
      {
        newUser: true
      }
    );
  };

  setExistingUser() {
    this.setState(
      {
        newUser: false
      }
    );
  };

  signUserIn( email, password ) {
    signIn(
      email,
      password
    ).
      then(
        user => {
          this.props.setUser( user );
        }
      );
  };

  signUserUp( email, password, passwordConfirmation ) {
    signUp(
      email,
      password,
      passwordConfirmation
    ).
      then(
        user => {
          this.props.setUser( user );
        }
      );
  };

  authenticationControl() {
    if ( this.state.newUser ) {
      return(
        <span>
          Already a user?
          <span onClick={ this.setExistingUser }> Log In</span>
        </span>
      );
    } else {
      return(
        <span>
          Need to sign up?
          <span onClick={ this.setNewUser }> Sign Up</span>
        </span>
      );
    }
  };

  renderForm() {
    if ( this.state.newUser ) {
      return(
        <NewUser signUserUp={ this.signUserUp }/>
      );
    } else {
      return(
        <ExistingUser signUserIn={ this.signUserIn }/>
      );
    }
  };

  render() {
    return(
      <div className="authentication-container">
        { this.authenticationControl() }
        { this.renderForm() }
      </div>
    )
  }
}

export default Authentication;
