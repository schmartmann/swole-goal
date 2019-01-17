import React, { Component } from 'react';
import Exercise from './exercise';

const renderExercises = ( exercises ) => {
  if ( exercises && exercises.length > 0 ) {
    return exercises.map(
      exercise =>
        <Exercise key={ exercise.uuid }
          exercise={ exercise }
          index={ exercises.indexOf( exercise ) }
        />
    );
  }
  else {
    return null;
  }
}

const Exercises = ( { exercises } ) => {
  return(
    <div className="exercises">
      { renderExercises( exercises ) }
    </div>
  );
}

export default Exercises;
