import React, { Component } from 'react';
import { getWorkouts } from '../actions/workouts';

class Workouts extends Component {
  componentWillMount() {
    this.getWorkouts( this.props.user.headers );
  }
  render() {
    return (
      <div className="workouts-container">
        <h1>workouts go here</h1>
      </div>
    );
  }
}

export default Workouts;
