import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return(
      <div className="component-main">
        <span>Welcome to Swole Goal!</span>
        <section>
          <span>Click <Link to="/register">here</Link> to create an account and start building your workouts</span>
        </section>
      </div>
    );
  }
};

export default Landing;
