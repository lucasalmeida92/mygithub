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

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleLoadReposClick = this.handleLoadReposClick.bind(this);
    this.handleRepoClick = this.handleRepoClick.bind(this);
  }

  // componentDidMount() {
  //   const username = this.props.user.username;
  //   if(username) {
  //     this.props.fetchRepositories(username);
  //   }
  // }

  handleUsernameChange(e) {
    const value = e.target.value;
    this.setState({ username: value });
  }

  handleLoadReposClick(e) {
    e.preventDefault();
    const username = this.state.username;
    if(username.length > 0) {
      this.props.fetchUserData(this.state.username);
      this.props.fetchRepositories(username);
    }
  }

  handleRepoClick(repoName) {
    const username = this.props.user.username;
    this.props.selectRepository(repoName);
    this.props.history.push(`/user/${username}/repo/${repoName}`);
  }

  render() {
    const { repositories, user } = this.props;
    let pageContent = <p>Loading...</p>;

    if(repositories.list.length > 0) {
      pageContent = repositories.list
        .map((repo, index) => {
          return(
            <Repository key={index} repository={repo} onRepoClick={this.handleRepoClick} />
          )
        });
    } else if(!user.username){
      pageContent = (
        <div>
          <p>Enter your GitHub username:</p>
          <form>
            <input type="text" placeholder="ex: lucasalmeida92" onChange={this.handleUsernameChange}/>
            <button className="button" onClick={this.handleLoadReposClick}>Load Repositories</button>
          </form>
        </div>
      );
    } else {
      pageContent = <p>No repository found. Please try again later.</p>;
    }

    return (
      <div className="RepositoriesPage">
        <h2>Repositories</h2>
        <p className="RepositoriesPage__instruction">Click on a repository to see it's commits.</p>
        <User />
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
