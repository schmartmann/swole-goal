import React, { Component } from 'react';
import Authentication from './authentication';

class Register extends Component {
  render() {
    return(
      <div>
        <span>Register form goes here</span>
        <Authentication setUser={ this.props.setUser }/>
      </div>
    )
  }
}

export default Register;
