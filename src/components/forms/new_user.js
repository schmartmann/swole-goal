import React, { Component } from 'react';

class NewUser extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: {
        email: false,
        password: false,
        passwordConfirmation: false
      }
    };

    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  handleSubmit( event ) {
    event.preventDefault();

    if ( this.formValid() ) {

      this.props.signUserUp(
        this.state.user.email,
        this.state.user.password,
        this.state.user.passwordConfirmation
      );
    }
    else {
      //error handling
    }
  };

  handleChange( event ) {
    event.preventDefault();
    var user = this.state.user;
    var key = event.target.name;
    var value = event.target.value;
    user[ key ] = value;

    this.setState(
      {
        user: user
      }
    );
  };

  validateForm() {
    var fields = this.state.user;
    var errors = this.state.errors;

    if ( !fields.email ) {
      errors.email = true;
    }

    if ( !fields.password ) {
      errors.password = true;
    }

    if ( fields.password !== fields.passwordConfirmation ) {
      errors.passwordConfirmation = true;
    }

    return errors;
  };

  formValid() {
    var valid = true;
    var errors = this.validateForm();
    var errorKeys = Object.keys( errors ).map( key => errors[ key ] )
    if ( errorKeys.includes( true ) ) {
      valid = false;
    }

    return valid;
  }

  render() {
    return(
      <form className="form" name="newUser" onSubmit={ this.handleSubmit }>
        <label>Sign Up</label>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="text" value={ this.state.user.email } name="email" onChange={ this.handleChange }/>
        </div>
        <div className="form-field">
          <label htmlFor="email">Password</label>
          <input type="password" value={ this.state.user.password } name="password" onChange={ this.handleChange }/>
        </div>
        <div className="form-field">
          <label htmlFor="email">Confirm Password</label>
          <input type="password" value={ this.state.user.passwordConfirmation } name="passwordConfirmation" onChange={ this.handleChange }/>
        </div>
        <div className="form-field">
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  };
};

export default NewUser;
