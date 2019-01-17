import { apiGetRequest, apiPostRequest } from './request';

export function getWorkouts( user ) {
  return new Promise(
    ( resolve, reject ) => {
      return apiGetRequest( user.headers, '/workouts' ).
        then(
          userWorkouts => resolve( [ user, userWorkouts ] )
        ).
        catch(
          error => reject( error )
        );
    }
  );
};

export function postWorkout( user, body ) {
  return new Promise(
    ( resolve, reject ) => {
      return apiPostRequest( user.headers, '/workouts', body ).
        then(
          userWorkouts => resolve( [ user, userWorkouts ] )
        ).
        catch(
          error => reject( error )
        );
    }
  );
};
