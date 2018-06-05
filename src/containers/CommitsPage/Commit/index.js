import React, { Component } from 'react';
import s from './index.scss';
import moment from 'moment';

class Commit extends Component {
  render() {
    const { commit } = this.props;

    if(commit) {
      return (
        <div className={s.commit}>
          <a className={s.message} href={commit.html_url} target="_blank" title={commit.commit.message}>{ commit.commit.message }</a>
          <div className={s.meta}>
            <img className={s.authorAvatar} src={commit.author && commit.author.avatar_url} />
            <p>
              <strong>
                { commit.author
                  ? commit.author.login
                  : commit.commit.author.name }
              </strong>
              <span className={s.date}>
                { moment(commit.commit.author.date).startOf('hour').fromNow() }
              </span>
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
