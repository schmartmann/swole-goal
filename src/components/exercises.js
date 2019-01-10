import React, { Component } from 'react';

class Exercise extends Component {
  buildText() {

  }

  render() {
    const exercise = this.props.exercise;
    return(
      <div className="exercise">
        { `Step ${ this.props.index }: ${ exercise.name } ${ exercise.quantity } ${ exercise.unit}` }
      </div>
    )
  }
}

class Exercises extends Component {
  renderExercises() {
    return this.props.exercises.map(
      exercise => {
        return( <Exercise key={ exercise.uuid } exercise={ exercise } index={ this.props.exercises.indexOf( exercise ) + 1 }/> )
      }
    );
  };

  render() {
    return(
      <div className="exercises">
        { this.renderExercises() }
      </div>
    )
  }
};

export default Exercises;
