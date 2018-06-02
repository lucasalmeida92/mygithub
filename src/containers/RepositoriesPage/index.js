import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRepositories, selectRepository } from '../../redux/actions/RepositoriesActions';
import { fetchUserData } from '../../redux/actions/UserActions';
import Repository from './Repository';
import Loader from '../../components/Loader';
import User from '../../components/User';
import './index.scss';

const mapStateToProps = (state, props) => ({
  user: state.user,
  repositories: state.repositories
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchUserData,
    fetchRepositories,
    selectRepository
  }, dispatch);
};

class RepositoriesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };

    this._handleRemoveUser = this._handleRemoveUser.bind(this);
    this._handleRepoClick = this._handleRepoClick.bind(this);
  }

  componentDidMount() {
    let username;

    if(!this.props.user.username) {
      username = this.props.match.params.username;
      this.props.fetchUserData(username);
    } else {
      username = this.props.user.username;
    }

    this.props.fetchRepositories(username);
  }

  _handleRemoveUser() {
    this.props.history.push('/');
  }

  _handleRepoClick(repoName) {
    const username = this.props.user.username;
    this.props.selectRepository(repoName);
    this.props.history.push(`/${username}/${repoName}`);
  }

  render() {
    const { repositories, user } = this.props;
    let pageContent = <p>Loading...</p>;

    if(repositories.list.length > 0) {
      pageContent = repositories.list
        .map((repo, index) => {
          return(
            <Repository key={index} repository={repo} onRepoClick={this._handleRepoClick} />
          )
        });
    } else {
      pageContent = <p>No repository found. Please try again later.</p>;
    }

    return (
      <div className="RepositoriesPage">
        <h2>Repositories</h2>
        <p className="RepositoriesPage__instruction">Click on a repository to see it's commits.</p>
        <User onRemoveUser={this._handleRemoveUser} />
        <div className="RepositoriesPage__content">
          {
            repositories.isLoading || user.isLoading
              ? <Loader />
              : pageContent
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesPage);
