import Cookies from 'universal-cookie';
import Auth from 'j-toker'

const ROOT_URL = 'http://localhost:3001'

const authConfig = {
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


Auth.configure( authConfig );

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
        cookies.set( 'sgUser', headers, { path: '/' } );
        return bundleUserData( user, headers );
      }
    ).
    catch(
      error => {
        console.log( error );
      }
    );
};

export function signUp( email, password, passwordConfirmation ) {
  return Auth.emailSignUp(
    {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
  ).
    then(
      user => {
        const cookies = new Cookies();
        var headers = parseHeaders( cookies );
        return bundleUserData( user, headers );
      }
    ).
    catch(
      error => {
        console.log( error );
      }
    );
};

export const requireAuth = () => {
  return new Promise(
    ( resolve, reject ) => {
      return Auth.validateToken().
        then(
          user => {
            if ( user ) {
              const cookies = new Cookies();
              var headers = parseHeaders( cookies );
              user.headers = headers;

              resolve( user );
            } else {
              reject( user );
            }
          }
        ).
        catch(
          error => reject( error )
        );
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
