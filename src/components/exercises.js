import React, { Component } from 'react';

const Exercise = () => (
  <div>an exercise</div>
);

class Exercises extends Component {
  render() {
    return(
      <div>
        <span>exercises go here</span>
        <Exercise/>
      </div>
    )
  }
};

export default Exercises;
