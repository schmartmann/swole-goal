import React, { Component } from 'react';
import Navigation from './navigation';
import { getUser, postUser } from '../actions/user';

class User extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        name: '',
        email: ''
      },
      errors: {
        name: false,
        email: false
      },
      message: ''
    };

    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  };

  componentDidMount() {
    this.setState(
      {
        user: this.props.user
      }
    )
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
    var valid;
    var user = this.state.user;
    var errors = this.state.errors;
    var message = this.state.message;

    if ( !user.email ) {
      errors.email = true;
      message = message.concat( 'Email is required!' )
    }

    this.setState(
      {
        errors: errors,
        message: message
      }
    )

    valid = Object.keys( errors ).map( key => errors[ key ] ).includes( true ) ? false : true;
    return valid;
  };

  handleSubmit( event ) {
    event.preventDefault();

    if ( this.validateForm() ) {
      var body = {
        user: {
          name: this.state.user.name,
          email: this.state.user.email
        }
      };

      postUser(
        this.state.user.headers,
        body
      ).then(
        updatedUser => {
          updatedUser.headers = {};

          Object.assign( updatedUser.headers, this.state.user.headers );

          this.setState(
            {
              user: updatedUser,
              message: 'Account information successfully updated!'
            }
          );
        }
      ).catch(
        error => error
      );
    }
  };

  render() {
    return(
      <div className="component-main">
        <Navigation/>
        <form className="form existing-user" name="existingUser" onSubmit={ this.handleSubmit }>
          <label>Update Account Info</label>
          <span className="success">{ this.state.message }</span>
          <div className="form-field">
            <label htmlFor="email">Name</label>
            <input type="text" value={ this.state.user.name } name="name" onChange={ this.handleChange }/>
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="text" value={ this.state.user.email } name="email" onChange={ this.handleChange }/>
          </div>
          <div className="form-field">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
};

export default User;
