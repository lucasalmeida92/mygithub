import React, { Component } from 'react';
import s from './index.scss';

class PageContent extends Component {
  render() {
    return (
      <div className={s.pageContent}>
        <div className={s.wrapper}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default PageContent;
