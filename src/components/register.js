import React, { Component } from 'react';
import Authentication from './authentication';

class Register extends Component {
  render() {
    return(
      <div className="component-main">
        <Authentication setUser={ this.props.setUser }/>
      </div>
    )
  }
};

export default Register;
