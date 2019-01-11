import React, { Component } from 'react';
import Navigation from './navigation';
import { postWorkout } from '../actions/workouts';
import { getExercises } from '../actions/exercises';

class WorkoutBuilder extends Component {
  constructor() {
    super();

    this.state = {
      workout: {
        uuid: null,
        name: '',
        pairedExercises: []
      },
      exercises: null
    };

    this.handleSubmit    = this.handleSubmit.bind( this );
    this.handleChange    = this.handleChange.bind( this );
    this.addExercise     = this.addExercise.bind( this );
    this.removeExercise  = this.removeExercise.bind( this );
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

  returnExistingExercises() {
    if ( this.state.exercises ) {
      return this.state.exercises.map(
        exercise => {
          return (
            <div className="exercise" key={ exercise.uuid } name={ exercise.uuid }>
              <label htmlFor={ exercise.uuid }>
                { exercise.name } { exercise.quantity } { exercise.unit }
              </label>
              <input type="checkbox" onClick={ this.addExercise } name={ exercise.uuid } />
            </div>
          );
        }
      );
    }
  };

  returnSelectedExercises() {
    if ( this.state.workout.pairedExercises.length > 0 ) {
      return this.state.workout.pairedExercises.map(
        exercise => {
          return (
            <div className="exercise" onClick={ this.removeExercise } key={ exercise.uuid } name={ exercise.uuid }>
              { exercise.name } { exercise.quantity } { exercise.unit }
            </div>
          );
        }
      );
    }
  };

  returnSelectedExercisesContainer() {
    if ( this.state.workout.pairedExercises.length > 0 ) {
      return(
        <div className="form-field exercise">
          <span>Selected Exercises</span>
          <div className="exercises-container">
            { this.returnSelectedExercises() }
          </div>
        </div>
      );
    }
  };

  addExercise( event ) {
    event.preventDefault();
    var targetUuid = event.target.attributes[ 'name' ].value;
    var existingExercises = this.state.exercises;
    var pairedExercises = this.state.workout.pairedExercises;
    var exercise = existingExercises.find( exercise => exercise.uuid === targetUuid );

    if ( pairedExercises.indexOf( exercise ) <= -1) {
      pairedExercises.push( exercise );
      var index = existingExercises.indexOf( exercise );
      existingExercises.splice( index, 1 );
    }

    this.setState(
      {
        workouts: {
          pairedExercises: pairedExercises
        },
        exercises: existingExercises,
        errors: {
          name: false,
          exercises: false
        }
      }
    );
  };

  removeExercise( event ) {
    event.preventDefault();
    var targetUuid = event.target.attributes[ 'name' ].value;
    var existingExercises = this.state.exercises;
    var pairedExercises = this.state.workout.pairedExercises;
    var exercise = pairedExercises.find( exercise => exercise.uuid === targetUuid );

    if ( pairedExercises.indexOf( exercise ) >= 0 ) {
      existingExercises.push( exercise );
      var index = pairedExercises.indexOf( exercise );
      pairedExercises.splice( index, 1 );
    }

    this.setState(
      {
        workouts: {
          pairedExercises: pairedExercises
        },
        exercises: existingExercises
      }
    );
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

  validateForm() {
    var valid;
    var workout = this.state.workout;
    var errors = this.state.errors;

    if ( !workout.name ) {
      errors.name = true;
    }

    if ( workout.pairedExercises.length < 1 ) {
      errors.exercises = true
    }

    valid = Object.keys( errors ).map( key => errors[ key ] ).includes( true ) ? false : true;
    return valid;
  };

  handleSubmit( event ) {
    event.preventDefault();

    if ( this.validateForm() ) {
      var workout = this.state.workout;
      var uuids = workout.pairedExercises.map( exercise => exercise.uuid );

      var body = {
        workout: {
          name: workout.name,
          exercise_uuids: uuids
        }
      };

      postWorkout(
        this.props.user.headers,
        body
      ).then(
        workout => {
          this.props.addWorkout(
            workout
          );

          this.props.history.push( '/workouts' );
        }
      ).catch(
        error => error
      );
    }
  };

  render() {
    const workout = this.state.workout;
    return (
      <div className="component-main">
        <Navigation/>
        <form className="form new-workout" name="newWorkout" onSubmit={ this.handleSubmit }>
          <label>Add New Workout</label>

          <div className="form-field new-workout-name">
            <label htmlFor="name">Name</label>
            <input type="text" value={ workout.name } name="name" onChange={ this.handleChange }/>
          </div>

          { this.returnSelectedExercisesContainer() }

          <div className="form-field exercise">
            <span>{ this.state.workout.pairedExercises.length === 0 ? 'Add at least one exercise' : 'Exercises' } </span>
            <div className="exercises-container">
              { this.returnExistingExercises() }
            </div>
          </div>

          <div className="form-field">
            <button type="submit">Add Workout</button>
          </div>
        </form>
      </div>
    )
  }
}

export default WorkoutBuilder;
