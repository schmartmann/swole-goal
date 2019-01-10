import React, { Component } from 'react';

class ExistingUser extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        email: '',
        password: ''
      },
      errors: {
        email: false,
        password: false
      }
    };

    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  handleSubmit( event ) {
    event.preventDefault();

    if ( this.formValid() ) {

      this.props.signUserIn(
        this.state.user.email,
        this.state.user.password
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
      <form className="form" name="existingUser" onSubmit={ this.handleSubmit }>
        <label>Log In</label>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="text" value={ this.state.user.email } name="email" onChange={ this.handleChange }/>
        </div>
        <div className="form-field">
          <label htmlFor="email">Password</label>
          <input type="password" value={ this.state.user.password } name="password" onChange={ this.handleChange }/>
        </div>
        <div className="form-field">
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  };
};

export default ExistingUser;
