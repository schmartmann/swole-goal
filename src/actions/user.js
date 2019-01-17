import { apiGetRequest, apiPostRequest } from './request';

export function postUser( user, body ) {
  return new Promise(
    ( resolve, reject ) => {
      return apiPostRequest( user.headers, '/user_info', body ).
        then(
          user => resolve( user )
        ).
        catch(
          error => error
        );
    }
  );
};
