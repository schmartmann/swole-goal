import React, { Component } from 'react';
import { signIn } from '../actions/auth';

import { Cookies } from 'react-cookie';
import Auth from 'j-toker'

const ROOT_URL = 'http://localhost:3001'

Auth.configure(
  {
    apiUrl: ROOT_URL,
    passwordReserSuccessUrl: function() {
      return `${ ROOT_URL }/pass`;
    },
    confirmationSuccessUrl: function() {
      return `${ ROOT_URL }/pass`;
    },
    tokenFormat: {
      "access-token": "{{ access-token }}",
      "token-type":   "Bearer",
      client:         "{{ client }}",
      expiry:         "{{ expiry }}",
      uid:            "{{ uid }}"
    }
  }
);


class Authentication extends Component {
  constructor() {
    super();

    this.state = {
      auth: false
    };

    this.handleClick = this.handleClick.bind( this );
    this.signIn      = this.signIn.bind( this );
  }

  signIn( user, password ) {
    return Auth.emailSignIn(
      {
        email: user,
        password: password
      }
    ).
    then(
      user => {
        debugger
        Cookies.save( 'sgUser', user.data.uid, { path: '/' } );
        const headers = Cookies.load( 'authHeaders ' );
        const data = Object.assign( user.data, headers );
      }
    ).
    catch(
      error => {
        console.log( error );
      }
    );
  };

  handleClick() {
    console.log( process.env )
    this.signIn(
      process.env.REACT_APP_EMAIL,
      process.env.REACT_APP_PASS
    )
  };

  render() {
    return(
      <div className="authentication-container">
        <button onClick={ this.handleClick }>Sign In</button>
      </div>
    )
  }
}

export default Authentication;
