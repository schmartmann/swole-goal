import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './components/landing';
import Register from './components/register';

import Workouts from './components/workouts';
import User from './components/user';
import WorkoutBuilder from './components/workout_builder';

import './App.css';

const App = () => {
  return(
    <Router>
      <div className="app-container">
        <Route exact path="/"   exact component={ Landing } />
        <Route path="/register" exact component={ Register } />
        <Route path="/workouts" exact component={ Workouts } />
        <Route path="/workout"  exact component={ WorkoutBuilder } />
        <Route path="/user"     exact component={ User } />
      </div>
    </Router>
  );
};

export default App;
