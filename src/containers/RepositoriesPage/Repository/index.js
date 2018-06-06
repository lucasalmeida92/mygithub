import React, { Component } from 'react';
import FA from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';
import s from './index.scss';

class Repository extends Component {
  constructor(props) {
    super(props);

    this._handleOnClick = this._handleOnClick.bind(this);
  }

  _handleOnClick(e, repositoryName) {
    e.preventDefault();
    this.props.onRepoClick(repositoryName);
  }

  render() {
    let { repository } = this.props;

    return (
      <a className={s.wrapper} href="javascript:void(0)" onClick={(e) => this._handleOnClick(e, repository.name)} title={repository.name}>
        <h3 className={s.name}>{ repository.name }</h3>
        <p className={s.description}>{ repository.description }</p>
        <span className={s.stars}>
          <FA name="star" cssModule={faStyles} className={s.starIcon} /> {repository.stargazers_count} stars
        </span>
      </a>
    );
  }
}

export default Repository;
