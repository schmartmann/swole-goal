const ROOT_URL = 'http://localhost:3001'

export function apiRequest( headers, route ) {
  return fetch(
    `${ ROOT_URL }${ route }`, {
      method: 'get',
      headers: {
        'Access-Token': headers[ 'access-token' ],
        'Client': headers.client,
        'Token-Type': headers[ 'token-type' ],
        'Expiry': headers.expiry,
        'Uid': headers.uid
      }
    }
  ).then(
    response => response.json()
  ).catch(
    error => error
  );
};
