import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from './navigation';
import Workout from './workout';
import { requireAuth } from '../actions/auth';
import { getWorkouts } from '../actions/workouts';


const workoutsView = ( workouts ) => {
  var copy = workouts && workouts.length > 0 ?
    'Workouts' :
    "You don't have any workouts yet! Click 'Create Workout' to get started"

  return(
    <div className="component-main">
      <Navigation/>
      <div className="workouts-container">
        <span className="section-title">
          { copy }
        </span>
        { renderWorkouts( workouts ) }
      </div>
    </div>
  );
};

const renderWorkouts = ( workouts ) => {
  if ( workouts && workouts.length > 0 ) {
    return workouts.map(
      workout => {
        return( <Workout key={ workout.uuid } workout={ workout }/> )
      }
    );
  } else {
    return null;
  }
};

class Workouts extends Component {
  state = { user: null, workouts: [], loading: true };

  componentWillMount() {
    requireAuth().
      then(
        user => getWorkouts( user )
      ).
      then(
        results => {
          this.setState(
            {
              user: results[ 0 ],
              workouts: results[ 1 ],
              loading: false
            }
          );
        }
      ).
      catch(
        error => console.log( error )
      );
  };

  render() {
    const { workouts, user, loading } = this.state;

    if ( !loading && user && workouts ) {
      return( workoutsView( workouts ) );
    }
    else if ( !loading && !user ) {
      return( <Redirect to="/register"/> )
    }
    else if ( loading && !user ) {
      return null;
    }
  }
}

export default Workouts;
