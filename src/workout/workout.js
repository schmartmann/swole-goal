import React, { Component } from 'react';
import Exercises from '../exercises/exercises';

const buildExercises = ( { exercises } ) => {
  if ( exercises && exercises.length > 0 ) {
    return(
      <div>
        <span>Exercises:</span>
        <Exercises exercises={ exercises }/>
      </div>
    );
  }
  else {
    return null;
  }
};

const Workout = ( { workout } ) => {
  return(
    <div className="workout">
      <div className="workout-info">
        <span>{ workout.name }</span>
      </div>
      <div className="workout-exercises">
        { buildExercises( workout ) }
      </div>
    </div>
  )
};

export default Workout;
