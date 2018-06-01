import React, { Component } from 'react';
import './index.scss';
import FA from 'react-fontawesome';

class Loader extends Component {
  render() {
    return (
      <FA name="github" className="Loader" />
    );
  }
}

export default Loader;
