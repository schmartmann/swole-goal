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
export const signIn = ( user, password ) => {
  return new Promise(
    ( resolve, reject ) => {

      var params = {
        email: user,
        password: password
      };

      return Auth.emailSignIn( params ).
        then(
          user => {
            const cookies = new Cookies();
            var headers = parseHeaders( cookies );
            user = bundleUserData( user, headers );
            resolve( user );
          }
        ).
        catch(
          error => reject( error )
        );
    }
  );
};

export const signUp = ( email, password, passwordConfirmation ) => {
  return new Promise(
    ( resolve, reject ) => {

      var params = {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      };

      return Auth.emailSignUp( params ).
        then(
          user => {
            const cookies = new Cookies();
            var headers = parseHeaders( cookies );
            user = bundleUserData( user, headers );
            resolve( user );
          }
        ).
        catch(
          error => reject( error )
        );
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
            }
            else {
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
