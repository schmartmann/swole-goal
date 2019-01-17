import React, { Component } from 'react';
import Exercises from './exercises';

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

export default Workout;
