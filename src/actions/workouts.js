import { apiGetRequest, apiPostRequest } from './request';

export function getWorkouts( headers ) {
  return apiGetRequest( headers, '/workouts' ).
    then(
      workouts => workouts
    ).catch(
      error => console.log( error )
    )
};

export function postWorkout( headers, body ) {  
  return apiPostRequest( headers, '/workouts', body ).
  then(
    workout => workout
  ).catch(
    error => console.log( error )
  )
};
