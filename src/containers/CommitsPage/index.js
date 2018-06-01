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
  selectedRepo: state.repositories.selectedRepo,
  commits: state.commits
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCommits,
    fetchUserData
  }, dispatch);
}

class CommitsPage extends Component {

  componentDidMount() {
    let username, repoName;

    if(!this.props.username) {
      username = this.props.match.params.username;
      repoName = this.props.match.params.repoName;
      this.props.fetchUserData(username);
      // TO DO: Load repo infos
    } else {
      username = this.props.user.username;
      repoName = this.props.selectedRepo.name;
    }

    this.props.fetchCommits(username, repoName);
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

    return (
      <div className="CommitsPage">
        <Helmet>
          <title>MyGitHub - Details</title>
        </Helmet>
        <h2>Commits</h2>
        <User />
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
