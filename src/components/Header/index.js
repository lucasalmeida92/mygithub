import React, { Component } from 'react';
import './index.scss';
import FA from 'react-fontawesome';

class Header extends Component {
  render() {
    return (
        <header className="Header">
          <h1 className="Header__title">
            <a href="/" title="Homepage">
              <FA name="github"/> <em>My</em>GitHub
            </a>
          </h1>
        </header>
    );
  }
}

export default Header;
