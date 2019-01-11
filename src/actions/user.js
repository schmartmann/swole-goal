import { apiGetRequest, apiPostRequest } from './request';

export function getUser( headers ) {
  return apiGetRequest( headers, '/user_info' ).
    then(
      user => user
    ).catch(
      error => console.log( error )
    );
};

export function postUser( headers, body ) {
  return apiPostRequest( headers, '/user_info', body ).
    then(
      user => user
    ).catch(
      error => console.log( error )
    );
}
