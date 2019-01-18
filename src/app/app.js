import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from '../landing/landing';
import Register from '../register/register';

import Workouts from '../workouts/workouts';
import WorkoutBuilder from '../workout/workout_builder';

import User from '../user/user';

import './app.css';

const App = () => {
  return(
    <Router>
      <div className="app-container">
        <Route path="/" exact  exact component={ Landing } />
        <Route path="/register" exact component={ Register } />
        <Route path="/workouts" exact component={ Workouts } />
        <Route path="/workout"  exact component={ WorkoutBuilder } />
        <Route path="/user"     exact component={ User } />
      </div>
    </Router>
  );
};

export default App;
