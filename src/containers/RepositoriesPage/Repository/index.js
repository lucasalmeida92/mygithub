import React, { Component } from 'react';
import FA from 'react-fontawesome';
import './index.scss';

class Repository extends Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e, repositoryName) {
    e.preventDefault();
    this.props.onRepoClick(repositoryName);
  }

  render() {
    let { repository } = this.props;

    return (
      <a className="Repository" href="#" onClick={(e) => this.handleOnClick(e, repository.name)} title={repository.name}>
        <h3 className="Repository__name">{ repository.name }</h3>
        <p className="Repository__description">{ repository.description }</p>
        <span className="Repository__stars">
          <FA name="star" /> {repository.stargazers_count} stars
        </span>
      </a>
    );
  }
}

export default Repository;
