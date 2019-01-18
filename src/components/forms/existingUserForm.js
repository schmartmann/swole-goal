import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FormBase from './formBase';
import { signIn } from '../../actions/auth';

const DEFAULT_STATE = {
  user: {
    email: '',
    password: ''
  },
  errors: {}
};

const formValues = [
  { value: 'email', labelName: 'Email' },
  { value: 'password', labelName: 'Password' },
];

const formErrors = ( errors ) => {
  return Object.keys( errors ).length  > 0 ;
};


class ExistingUserForm extends Component {
  state = DEFAULT_STATE;

  validateForm( user, errors, setState ) {
    return new Promise(
      ( resolve, reject ) => {

        if ( !user.email ) {
          errors.email = true;
        }

        if ( !user.password ) {
          errors.password = true;
        }

        this.setState( { errors: errors } );
        resolve( errors );
      }
    );
  };

  handleSubmit( event ) {
    event.preventDefault();
    const { user, errors } = this.state;

    this.validateForm( user, errors ).
      then(
        () => {
          if ( !formErrors( errors ) ) {
            signIn(
              user.email,
              user.password,
            ).then(
              user => {
                this.props.setLoggedIn( user );
              }
            ).catch(
              error => {
                this.setState( DEFAULT_STATE );
              }
            )
          }
        }
      );
  };

  handleChange( event ) {
    event.preventDefault();

    var newState = this.state;
    var key = event.target.name;
    var value = event.target.value;
    newState.user[ key ] = value;

    this.setState( newState );
  };

  render() {
    const { newUser } = this.props;
    const { user, errors } = this.state;

    if ( !newUser ) {
      return(
        <FormBase
          name="existingUser"
          label="Sign In"
          model={ user }
          errors={ errors }
          values={ formValues }
          handleSubmit={ this.handleSubmit.bind( this ) }
          handleChange={ this.handleChange.bind( this ) }
        />
      )
    } else {
      return null;
    }
  };
};

export default ExistingUserForm;
