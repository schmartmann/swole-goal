import React, { Component } from 'react';
import Navigation from './navigation';
import Authentication from './authentication';

class Home extends Component {
  render() {
    return (
      <div className="main-interaction-area">
        <p>Welcome to Swole Goal!</p>
        <Authentication/>
      </div>
    );
  }
}

export default Home;
