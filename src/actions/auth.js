import Cookies from 'universal-cookie';
import Auth from 'j-toker'

const ROOT_URL = 'http://localhost:3001'

Auth.configure(
  {
    apiUrl: ROOT_URL,
    passwordReserSuccessUrl: function() {
      return `${ ROOT_URL }/pass`;
    },
    confirmationSuccessUrl: function() {
      return `${ ROOT_URL }/pass`;
    },
    tokenFormat: {
      "access-token": "{{ access-token }}",
      "token-type":   "Bearer",
      client:         "{{ client }}",
      expiry:         "{{ expiry }}",
      uid:            "{{ uid }}"
    }
  }
);

export function signIn( user, password ) {
  return Auth.emailSignIn(
    {
      email: user,
      password: password
    }
  ).
  then(
    user => {
      const cookies = new Cookies();
      var headers = parseHeaders( cookies );
      cookies.set( 'sgUser', user.data.uid, { path: '/' } );
      return bundleUserData( user, headers );
    }
  ).
  catch(
    error => {
      console.log( error );
    }
  );
};

function parseHeaders( cookies ) {
  return cookies.get( 'authHeaders' );
}

function bundleUserData( user, headers ) {
  user.data.headers = {};
  Object.assign( user.data.headers, headers );
  return user.data;
};
