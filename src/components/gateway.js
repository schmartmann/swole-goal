import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Gateway extends Component {
  componentWillMount() {
    console.log( this.props.children )
  }

  render() {
    return this.props.children;
  }
};

export default Gateway;
