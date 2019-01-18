import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FormBase from './formBase';
import { signUp } from '../../actions/auth';

const DEFAULT_STATE = {
  user: {
    email: '',
    uuid: '',
    password: '',
    passwordConfirmation: ''
  },
  errors: {}
};

const formValues = [
  { value: 'email', labelName: 'Email' },
  { value: 'name', labelName: 'Name' },
  { value: 'password', labelName: 'Password' },
  { value: 'passwordConfirmation', labelName: 'Confirm Password' }
];

const formErrors = ( errors ) => {
  return Object.keys( errors ).length > 0;
};

class NewUserForm extends Component {
  state = DEFAULT_STATE;

  validateForm( user, errors, setState ) {
    return new Promise(
      ( resolve, reject ) => {
        if ( !user.name ) {
          errors.name = true;
        }

        if ( !user.email ) {
          errors.email = true;
        }

        if ( !user.password ) {
          errors.password = true;
        }

        if ( !user.password === !user.passwordConfirmation ) {
          errors.passwordConfirmation = true;
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
            signUp(
              user.email,
              user.name,
              user.password,
              user.passwordConfirmation
            ).then(
              user => {
                if ( user ) {
                  this.props.setLoggedIn( user );
                }
              }
            ).catch(
              error => {
                console.log( error );
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

    if ( newUser ) {
      return(
        <FormBase
          name="newUser"
          label="Sign Up"
          model={ user }
          errors={ errors }
          values={ formValues }
          handleSubmit={ this.handleSubmit.bind( this ) }
          handleChange={ this.handleChange.bind( this ) }
        />
      )
    }
    else {
      return null;
    }
  }
};

export default NewUserForm;
