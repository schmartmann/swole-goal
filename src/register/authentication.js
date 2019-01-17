import React, { Component } from 'react';
import NewUser from '../components/forms/new_user';
import ExistingUser from '../components/forms/existing_user';
import { signIn, signUp } from '../actions/auth';

class Authentication extends Component {
  constructor() {
    super();

    this.state = {
      newUser: true
    };

    this.setNewUser      = this.setNewUser.bind( this );
    this.setExistingUser = this.setExistingUser.bind( this );
    this.signUserIn      = this.signUserIn.bind( this );
    this.signUserUp      = this.signUserUp.bind( this );
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
        <span className="auth-switch">
          Already a user?
          <span className="hoverable" onClick={ this.setExistingUser }> Log In</span>
        </span>
      );
    } else {
      return(
        <span className="auth-switch">
          Not a member?
          <span className="hoverable" onClick={ this.setNewUser }> Sign Up</span>
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
    );
  }
}

export default Authentication;
