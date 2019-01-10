import React, { Component } from 'react';
import Home from './components/home';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    };

    this.setUser = this.setUser.bind( this );
  }

  setUser( user ) {
    this.setState(
      {
        user: user
      }
    );
  }

  render() {
    return (
      <Home user={ this.state.user } setUser={ this.setUser }/>
    );
  }
}

export default App;
