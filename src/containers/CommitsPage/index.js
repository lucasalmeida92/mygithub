import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Loader from '../../components/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCommits } from '../../redux/actions/CommitsActions';
import { fetchUserData } from '../../redux/actions/UserActions';
import { withRouter } from 'react-router';
import './index.scss';
import User from '../../components/User';
import Commit from './Commit';

const mapStateToProps = state => ({
  user: state.user,
  selectedRepository: state.repositories.selectedRepository,
  commits: state.commits
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCommits,
    fetchUserData
  }, dispatch);
}

class CommitsPage extends Component {
  constructor(props) {
    super(props);

    this._handleRemoveUser = this._handleRemoveUser.bind(this);
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

    this.props.fetchCommits(username, repoName);
  }

  _handleRemoveUser() {
    this.props.history.push('/');
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
      repoInfos = (
        <div className="CommitsPage__repo-infos">
          <h3 className="CommitsPage__repo-name">{this.props.selectedRepository.name}</h3>
          <p className="CommitsPage__repo-description">{this.props.selectedRepository.description}</p>
        </div>
      );
    }

    return (
      <div className="CommitsPage">
        <Helmet>
          <title>MyGitHub - Details</title>
        </Helmet>
        <h2>Commits</h2>
        <User onRemoveUser={this._handleRemoveUser} />
        { repoInfos }
        <div className="CommitsPage__content">
          {
            commits.isLoading || user.isLoading
              ? <Loader />
              : pageContent
          }
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommitsPage));
