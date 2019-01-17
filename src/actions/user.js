import { apiGetRequest, apiPostRequest } from './request';

export function postUser( headers, body ) {
  return new Promise(
    ( resolve, reject ) => {
      return apiPostRequest( headers, '/user_info', body ).
        then(
          user => resolve( user )
        ).
        catch(
          error => error
        );
    }
  );
};
