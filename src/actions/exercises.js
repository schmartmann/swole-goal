import { apiGetRequest } from './request';

export function getExercises( user ) {
  return new Promise(
    ( resolve, reject ) => {
      return apiGetRequest( user.headers, '/exercises' ).
        then(
          exercises => resolve( [ user, exercises ] )
        ).
        catch(
          error => reject( error )
        );
    }
  );
};
