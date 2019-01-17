import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from './navigation';
import { requireAuth } from '../actions/auth';
import { postUser } from '../actions/user';

const DEFAULT_STATE = {
  loading: true,
  user: {
    name: '',
    email: '',
    uuid: null
  },
  errors: {
    name: false,
    email: false
  },
  message: ''
};

class User extends Component {
  state = DEFAULT_STATE;

  componentDidMount() {
    requireAuth().
      then(
        user => {
          var newState = this.state;
          newState.user = user;
          newState.loading = false;
          this.setState( newState );
        }
      ).catch(
        error => console.log( error )
      );
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
    const { user, errors, loading } = this.state;

    if ( !loading ) {
      if ( user.uuid ) {
        return(
          <div className="component-main">
            <Navigation/>
            <form className="form existing-user" name="existingUser" onSubmit={ this.handleSubmit.bind( this ) }>
              <label>Update Account Info</label>
              <span className="success">{ this.state.message }</span>
              <div className="form-field">
                <label htmlFor="email">Name</label>
                <input type="text" value={ this.state.user.name } name="name" onChange={ this.handleChange.bind( this ) }/>
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input type="text" value={ this.state.user.email } name="email" onChange={ this.handleChange.bind( this ) }/>
              </div>
              <div className="form-field">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        );
      }
      else if ( !user.uuid ) {
        return( <Redirect to="/register" /> );
      }
    }
    else if ( loading ) {
      return null;
    }
  }
};

export default User;
