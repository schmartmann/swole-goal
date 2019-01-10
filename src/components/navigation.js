import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return(
      <div className="navigation-container">
        <Link to="/workouts">My Workouts</Link>
        <Link to="/workout">Create Workout</Link>
        <Link to="/user">My Account</Link>
      </div>
    )
  }
};

export default Navigation;
