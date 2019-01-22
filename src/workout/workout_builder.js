import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from '../components/navigation';
import { requireAuth } from '../actions/auth';
import { postWorkout } from '../actions/workouts';
import { getExercises } from '../actions/exercises';

const AllExercises = ( { exercises, pairedExercises, addExercise } ) => {
  if ( exercises && exercises.length > 0 ) {
    var exercisesList = exercises.map(
      exercise => {
        return(
          <div className="exercise" key={ exercise.uuid } name={ exercise.uuid }>
            <label htmlFor={ exercise.uuid }>
              { exercise.name } { exercise.quantity } { exercise.unit }
            </label>
            <input type="checkbox" onClick={ addExercise } name={ exercise.uuid } />
          </div>
        );
      }
    );

    return(
      <div className="form-field exercise">
        <span>{ pairedExercises.length === 0 ? 'Add at least one exercise' : 'Exercises' } </span>
        <div className="exercises-container">
          { exercisesList }
        </div>
      </div>
    );
  }
  else {
    return null;
  }
};

const PairedExercises = ( { exercises, pairedExercises, removeExercise } ) => {
  if ( pairedExercises && pairedExercises.length > 0 ) {
    var pairedExercisesList = pairedExercises.map(
      exercise => {
        return (
          <div className="exercise" onClick={ removeExercise } key={ exercise.uuid } name={ exercise.uuid }>
            { exercise.name } { exercise.quantity } { exercise.unit }
          </div>
        );
      }
    );

    return(
      <div className="form-field exercise">
        <span>Selected Exercises</span>
        <div className="exercises-container">
          { pairedExercisesList }
        </div>
      </div>
    );
  }
  else {
    return null;
  }
};

const DEFAULT_STATE = {
  loading: true,
  user: null,
  workout: {
    uuid: null,
    name: '',
    pairedExercises: []
  },
  exercises: null,
  errors: {
    name: false
  }
};

class WorkoutBuilder extends Component {
  state = DEFAULT_STATE;

  componentWillMount() {
    console.log( "USER COMPONENT" );
    requireAuth().
      then(
        user => getExercises( user )
      ).
      then(
        results => {
          var user = results[ 0 ];
          var exercises = results[ 1 ];
          var newState = this.state;

          newState.loading = false;
          newState.user = user;
          newState.exercises = exercises;

          this.setState( newState );
        }
      ).
      catch(
        error => console.log( error )
      );
  };

  addExercise( event ) {
    event.preventDefault();
    var targetUuid = event.target.attributes[ 'name' ].value;
    var { exercises, workout } = this.state;
    var { pairedExercises } = workout;

    var exercise = exercises.find( exercise => exercise.uuid === targetUuid );

    if ( pairedExercises.indexOf( exercise ) <= -1 ) {
      pairedExercises.push( exercise );
      var index = exercises.indexOf( exercise );
      exercises.splice( index, 1 );
    }

    var newState = this.state;
    newState.workout.pairedExercises = pairedExercises;
    newState.exercises = exercises;

    this.setState( newState );
  };


  removeExercise( event ) {
    event.preventDefault();
    var targetUuid = event.target.attributes[ 'name' ].value;

    var { exercises, workout } = this.state;
    var { pairedExercises } = workout;

    var exercise = pairedExercises.find( exercise => exercise.uuid === targetUuid );

    if ( pairedExercises.indexOf( exercise ) >= 0 ) {
      exercises.push( exercise );
      var index = pairedExercises.indexOf( exercise );
      pairedExercises.splice( index, 1 );
    }

    var newState = this.state;
    newState.workout.pairedExercises = pairedExercises;
    newState.exercises = exercises;

    this.setState( newState );
  }

  setComponentLoading() {
    return new Promise(
      ( resolve, reject ) => {
        this.setState( { loading: true } );
        const { loading } = this.state;
        resolve( loading );
      }
    );
  }

  validateForm() {
    var valid;
    const { workout, errors } = this.state;

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
      const { workout, user } = this.state;
      const uuids = workout.pairedExercises.map( exercise => exercise.uuid );

      const body = {
        workout: {
          name: workout.name,
          exercise_uuids: uuids
        }
      };

      this.setComponentLoading().
        then(
          () => postWorkout( user, body )
        ).
        then(
          results => {
            var user = results[ 0 ];
            var workout = results[ 1 ];
            var newState = this.state;

            newState.loading = false;
            newState.user = user;
            newState.workout = workout;

            this.setState( newState );
          }
        ).
        catch(
          error => error
        );
    }
  };

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
    const { workout, loading, user, exercises } = this.state;

    if ( !loading ) {
      if ( user && !workout.uuid ) {
        return (
          <div className="component-main">
            <Navigation/>
            <form className="form new-workout" name="newWorkout" onSubmit={ this.handleSubmit.bind( this ) }>
              <label>Add New Workout</label>

              <div className="form-field new-workout-name">
                <label htmlFor="name">Name</label>
                <input type="text" value={ workout.name } name="name" onChange={ this.handleChange.bind( this ) }/>
              </div>

              <PairedExercises
                exercises={ exercises }
                pairedExercises={ workout.pairedExercises }
                removeExercise={ this.removeExercise.bind( this ) }
              />

              <AllExercises
                exercises={ exercises }
                pairedExercises={ workout.pairedExercises }
                addExercise={ this.addExercise.bind( this ) }
              />

              <div className="form-field">
                <button type="submit">Add Workout</button>
              </div>
            </form>
          </div>
        );
      } else if ( user && workout.uuid ) {
        return( <Redirect to="/workouts"/> );
      } else {
        return( <Redirect to="/register"/> );
      }
    }
    else {
      return null;
    }
  }
}

export default WorkoutBuilder;
