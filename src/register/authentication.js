import React, { Component } from 'react';
import NewUser from '../components/forms/new_user';
import ExistingUser from '../components/forms/existing_user';
import { signIn, signUp } from '../actions/auth';

const AuthComponentSwitch = () => {
  debugger
  if ( newUser ) {
    return (
      'Already a user?',
      <span className="hoverable" onClick={ this.setExistingUser }> Log In</span>
    );
  } else {
    return(
      'Not a member?',
      <span className="hoverable" onClick={ this.setNewUser }> Sign Up</span>
    );
  }
};

const Authentication extends Component {
  state = { newUser: true };

  toggleComponent() {
    var { newUser } = this.state;
    newUser = !newUser;
    this.setState( newUser );
  }

  render() {
    const { newUser } = this.state;

    return(
      <div className="authentication-container">
        <AuthComponentSwitch newUser={ newUser } toggleComponent={ this.toggleComponent.bind( this ) } />
      </div>
    );
  }
}

export default Authentication;
