import React, { Component } from 'react';
import Navigation from './navigation';
import Exercises from './exercises';
import { getWorkouts } from '../actions/workouts';

class Workout extends Component {
  renderExercises() {
    if ( this.props.workout.exercises.length > 0 ) {
      return(
        <div>
          <span>Exercises:</span>
          <Exercises exercises={ this.props.workout.exercises }/>
        </div>
      );
    } else {
      return(
        <div className="exercises-empty">
          No exercises for this workout!
        </div>
      );
    };
  };

  render() {
    return(
      <div className="workout">
        <div className="workout-info">
          <span>{ this.props.workout.name }</span>
        </div>
        <div className="workout-exercises">
          { this.renderExercises() }
        </div>
      </div>
    )
  };
};

class Workouts extends Component {
  componentWillMount() {
    getWorkouts( this.props.user.headers ).then(
      workouts => {
        this.props.setWorkouts( workouts );
      }
    );
  };

  renderWorkouts() {
    if ( this.props.workouts ) {
      return this.props.workouts.map(
        workout => {
          return ( <Workout key={ workout.uuid } workout={ workout }/> )
        }
      );
    }
  }

  render() {
    return (
      <div className="component-main">
        <Navigation/>
        <span>Your workouts: </span>
        <div className="workouts-container">
          { this.renderWorkouts() }
        </div>
      </div>
    );
  }
}

export default Workouts;
