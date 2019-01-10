import { apiRequest } from './request';

export function getWorkouts( headers ) {
  return apiRequest( headers, '/workouts' ).
    then(
      workouts => workouts
    );
};
