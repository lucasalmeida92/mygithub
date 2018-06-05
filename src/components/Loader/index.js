import React, { Component } from 'react';
import s from './index.scss';
import FA from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

class Loader extends Component {
  render() {
    return (
      <FA name="github" className={s.loader} cssModule={faStyles} />
    );
  }
}

export default Loader;
