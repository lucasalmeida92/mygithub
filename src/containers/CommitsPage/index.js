import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Loader from '../../components/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetCommits, fetchCommits } from '../../redux/actions/CommitsActions';
import { fetchUserData } from '../../redux/actions/UserActions';
import { withRouter } from 'react-router';
import s from './index.scss';
import User from '../../components/User';
import Commit from './Commit';
import RepoInfos from './RepoInfos';
import FA from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

const mapStateToProps = state => ({
  user: state.user,
  selectedRepository: state.repositories.selectedRepository,
  commits: state.commits
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    resetCommits,
    fetchCommits,
    fetchUserData
  }, dispatch);
}

class CommitsPage extends Component {
  constructor(props) {
    super(props);

    this._handleRemoveUser = this._handleRemoveUser.bind(this);
    this._addEndlessScrollingListenter = this._addEndlessScrollingListenter.bind(this);
    this._loadMoreCommits = this._loadMoreCommits.bind(this);
    this._handleOnBackClick = this._handleOnBackClick.bind(this);
  }

  componentWillMount() {
    this.props.resetCommits();
  }

  componentDidMount() {
    let username, repoName;

    if(!this.props.user.username) {
      username = this.props.match.params.username;
      repoName = this.props.match.params.repoName;
      this.props.fetchUserData(username);
      // TO DO: Load repo infos
    } else {
      username = this.props.user.username;
      repoName = this.props.selectedRepository.name;
    }

    this.props.fetchCommits(username, repoName, 1);
    this._addEndlessScrollingListenter();
  }

  _handleRemoveUser() {
    this.props.history.push('/');
  }

  _addEndlessScrollingListenter() {
    window.onscroll = function(e) {
      if(!this.props.commits.isLastPage) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
          if(!this.props.commits.isLoading) this._loadMoreCommits();
        }
      }
    }.bind(this);
  }

  _loadMoreCommits() {
    const username = this.props.match.params.username;
    const repoName = this.props.match.params.repoName;
    const page = this.props.commits.page;
    this.props.fetchCommits(username, repoName, page + 1);
  }

  _handleOnBackClick(e) {
    e.preventDefault();
    const username = this.props.match.params.username;
    this.props.history.push(`/${username}`);
  }

  render() {
    const { commits, user } = this.props;
    let pageContent = <p>Loading...</p>;

    if(commits.list.length > 0) {
      pageContent = commits.list
        .map((commit, index) => {
          return(
            <Commit key={index} commit={commit} />
          )
        });
    } else {
      pageContent = <p>Can't load repository commits. Please try again later.</p>;
    }

    let repoInfos = null;
    if(this.props.selectedRepository) {
      repoInfos = <RepoInfos repo={this.props.selectedRepository} />;
    }

    return (
      <div>
        <Helmet>
          <title>MyGitHub - Details</title>
        </Helmet>
        <h2>Commits</h2>
        <User onRemoveUser={this._handleRemoveUser} />
        { repoInfos }
        <a className={s.returnLink} href="javascript:void(0)" onClick={this._handleOnBackClick} title="Return to Repositories">
          <FA name="angle-left" cssModule={faStyles} /> Rerturn to Repositories
        </a>
        { (commits.isLoading || user.isLoading) && <Loader />  }
        <div className={s.content}>
          { pageContent }
        </div>
        {(commits.isLoading && commits.list.length > 0 && !commits.isLastPage) &&
          <p>Loading more commits...</p>}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommitsPage));
