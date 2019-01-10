import { apiRequest } from './request';

export function getWorkouts( headers ) {
  return apiRequest( headers, 'get', '/workouts' ).
    then(
      workouts => workouts
    ).catch(
      error => console.log( error )
    )
};

export function postWorkout( headers, body ) {
  return apiRequest( headers, 'post', '/workouts', body ).
  then(
    workout => workout
  ).catch(
    error => console.log( error )
  )
};
