import { apiRequest } from './request';

export function getExercises( headers ) {
  return apiRequest( headers, 'get', '/exercises' ).
    then(
      exercises => exercises 
    ).catch(
      error => console.log( error )
    );
};
