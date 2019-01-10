import React, { Component } from 'react';
import Navigation from './navigation';
import Workouts from './workouts';
import Exercises from './exercises';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="main-interaction-area">
        <Navigation user={ this.props.user }/>

        <Route path="/workouts"
          component={ Workouts }
          setWorkouts={ this.setWorkouts }
          user={ this.state.user }
          workouts={ this.state.workouts }/>
      </div>
    );
  }
};

export default Home;
