import React, { Component } from 'react';
import Navigation from './navigation';
import Authentication from './authentication';
import Workouts from './workouts';

class Home extends Component {
  returnGreeting() {
    if ( this.props.user ) {
      return(
        <p>Welcome to Swole Goal, { this.props.user.email }! </p>
      )
    }
  }

  returnWorkoutsComponent() {
    if ( this.props.user ) {
      return(
        <Workouts/>
      )
    }
  }
  render() {
    return (
      <div className="main-interaction-area">
          { this.returnGreeting() }
        <Authentication setUser={ this.props.setUser }/>
      </div>
    );
  }
}

export default Home;
