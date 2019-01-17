import React, { Component } from 'react';

const Exercise = ( { index, exercise } ) => {
  return(
    <div className="exercise">
      { `Step ${ index +1 }: ${ exercise.name } ${ exercise.quantity } ${ exercise.unit}` }
    </div>
  );
};

export default Exercise;
