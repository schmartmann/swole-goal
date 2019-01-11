
export function apiGetRequest( userHeaders, route ) {
  const ROOT_URL = 'http://localhost:3001';

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
  ).then(
    response => response.json()
  ).catch(
    error => error
  );
};

export function apiPostRequest( userHeaders, route, body ) {
  const ROOT_URL = 'http://localhost:3001';

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
  ).then(
    response => response.json()
  ).catch(
    error => error
  );
};
