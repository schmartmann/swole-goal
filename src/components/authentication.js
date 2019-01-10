import React, { Component } from 'react';
import { signIn } from '../actions/auth';
import { goHome } from '../actions/navigation';
import Cookies from 'universal-cookie';

class Authentication extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind( this );
  }

  handleClick() {
    signIn(
      process.env.REACT_APP_EMAIL,
      process.env.REACT_APP_PASS
    ).
    then(
      user => {
        this.props.setUser( user );
        goHome();
      }
    );
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
