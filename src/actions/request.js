
export function apiRequest( userHeaders, type, route ) {
  const ROOT_URL = 'http://localhost:3001/'

  return fetch(
    `${ ROOT_URL }${ route }`, {
      method: type,
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
