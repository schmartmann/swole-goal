import React, { Component } from 'react';
import { getWorkouts } from '../actions/workouts';

class Workouts extends Component {
  componentWillMount() {
    debugger
    this.getWorkouts();
  }

  getWorkouts() {
    getWorkouts( this.props.user.data.headers );
  }
  render() {
    return (
      <div className="workouts-container">
      </div>
    );
  }
}

export default Workouts;
