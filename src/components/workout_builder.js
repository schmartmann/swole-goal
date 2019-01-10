import React, { Component } from 'react';
import { postWorkout } from '../actions/workouts';
import { getExercises } from '../actions/exercises';

class WorkoutBuilder extends Component {
  constructor() {
    super();

    this.state = {
      workout: {
        name: '',
        exercises: []
      },
      exercises: null
    };

    this.handleSubmit = this.handleSubmit.bind( this );
  }

  componentDidMount() {
    getExercises( this.props.user.headers ).then(
      exercises => {
        this.setState(
          {
            exercises: exercises
          }
        );
      }
    );
  };

  returnExercises() {
    if ( this.state.exercises ) {
      return this.state.exercises.map(
        exercise => {
          return ( <div key={ exercise.uuid }>{ exercise.name }</div> );
        }
      );
    }
  }

  handleSubmit( event ) {
    event.preventDefault();
  }

  handleChange( event ) {
    event.preventDefault();
    var workout = this.state.workout;
    var key = event.target.name;
    var value = event.target.value;
    workout[ key ] = value;

    this.setState(
      {
        workout: workout
      }
    );
  };

  render() {
    const workout = this.state.workout;
    return (
      <div className="workout-builder">
        <form className="form" name="newWorkout" onSubmit={ this.handleSubmit }>
          <label>New Workout</label>
          <div className="form-field">
            <label htmlFor="name">Email</label>
            <input type="text" value={ workout.name } name="name" onChange={ this.handleChange }/>
          </div>

          <div className="form-field">
            { this.returnExercises() }
          </div>

          <div className="form-field">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default WorkoutBuilder;
