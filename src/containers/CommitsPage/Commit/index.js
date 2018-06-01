import React, { Component } from 'react';
import FA from 'react-fontawesome';
import './index.scss';

class Commit extends Component {
  render() {
    const { commit } = this.props;

    if(commit) {
      return (
        <div className="Commit">
          <a className="Commit__message" href={commit.html_url} target="_blank" title={commit.commit.message}>{ commit.commit.message }</a>
          <div className="Commit__meta">
            <img className="Commit__author-avatar" src={commit.author && commit.author.avatar_url} />
            <p>
              <strong>
              { commit.author
                ? commit.author.login
                : commit.commit.author.name }
              </strong>
              <span className="Commit__date">{ commit.commit.author.date }</span>
            </p>
          </div>
        </div>
      )
    } else {
      return (`Can't load commit data`);
    }
  }
}

export default Commit;
