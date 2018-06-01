import React, { Component } from 'react';
import './index.scss';

class PageContent extends Component {
  render() {
    return (
      <div className="PageContent">
        <div className="PageContent__wrapper">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default PageContent;
