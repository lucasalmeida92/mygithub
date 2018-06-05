import React, { Component } from 'react';
import FA from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';
import s from './index.scss';

class Header extends Component {
  render() {
    return (
        <header className={s.header}>
          <h1 className={s.title}>
            <a href="/" title="Homepage">
              <FA name="github" cssModule={faStyles} className={s.logoIcon} /> <em>My</em>GitHub
            </a>
          </h1>
        </header>
    );
  }
}

export default Header;
