
export function apiGetRequest( userHeaders, route ) {
  return new Promise(
    ( resolve, reject ) => {
      const ROOT_URL = process.env.REACT_APP_API_ROOT_URL || 'http://localhost:3001';

      return fetch(
        `${ ROOT_URL }${ route }`, {
          method: 'get',
          mode: 'cors',
          headers: {
            'Access-Token': userHeaders[ 'access-token' ],
            'Client': userHeaders.client,
            'Token-Type': userHeaders[ 'token-type' ],
            'Expiry': userHeaders.expiry,
            'Uid': userHeaders.uid
          }
        }
      ).
      then(
        response => response.json()
      ).
      then(
        response => resolve( response )
      ).
      catch(
        error => error
      );
    }
  );
};

export function apiPostRequest( userHeaders, route, body ) {
  return new Promise(
    ( resolve, reject ) => {
      const ROOT_URL = process.env.REACT_APP_API_ROOT_URL;

      return fetch(
        `${ ROOT_URL }${ route }`, {
          crossDomain: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Token': userHeaders[ 'access-token' ],
            'Client': userHeaders.client,
            'Token-Type': userHeaders[ 'token-type' ],
            'Expiry': userHeaders.expiry,
            'Uid': userHeaders.uid
          },
          body: JSON.stringify( body )
        }
      ).
      then(
        response => response.json()
      ).
      then(
        response => resolve( response )
      ).
      catch(
        error => reject( error )
      );
    }
  );
};
