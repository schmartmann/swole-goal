import React, { Component } from 'react';
import { signIn } from '../actions/auth';
import Cookies from 'universal-cookie';

class Authentication extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind( this );
  }

  handleClick() {
    const that = this;
    signIn(
      process.env.REACT_APP_EMAIL,
      process.env.REACT_APP_PASS
    ).
    then(
      user => {
        this.props.setUser( user );
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
