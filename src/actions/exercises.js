import { apiGetRequest } from './request';

export function getExercises( headers ) {
  return apiGetRequest( headers, '/exercises' ).
    then(
      exercises => exercises
    ).catch(
      error => console.log( error )
    );
};
