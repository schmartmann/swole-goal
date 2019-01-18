import React, { Component } from 'react';

const AuthComponentSwitch = ( { newUser, toggleComponent } ) => {
  if ( newUser ) {
    return(
      <div className="auth-switch">
        <p>Already a user?</p>
        <span className="hoverable" onClick={ toggleComponent }>Log In</span>
      </div>
    );
  } else {
    return(
      <div className="auth-switch">
        <p>Not a member?</p>
        <span className="hoverable" onClick={ toggleComponent }>Sign Up</span>
      </div>
    );
  }
};

export default AuthComponentSwitch;
