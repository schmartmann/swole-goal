import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return(
      <div className="component-main">
        <div className="welcome-container">
          <h1>Welcome to Swole Goal!</h1>
          <div className="copy">
            <span>This app is designed to help you save workouts.</span>
            <span>Click <i><Link to="/register">here</Link></i> to create an account and start building your workouts.</span>
          </div>
        </div>
      </div>
    );
  }
};

export default Landing;
