import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetRepositories, fetchRepositories, selectRepository } from '../../redux/actions/RepositoriesActions';
import { fetchUserData } from '../../redux/actions/UserActions';
import Repository from './Repository';
import Loader from '../../components/Loader';
import User from '../../components/User';
import s from './index.scss';
import Filters from './Filters';
import filterRepos from './filterRepos';

const mapStateToProps = (state, props) => ({
  user: state.user,
  repositories: state.repositories
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchUserData,
    resetRepositories,
    fetchRepositories,
    selectRepository
  }, dispatch);
};

class RepositoriesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      filtersChanged: false
    };

    this._handleRemoveUser = this._handleRemoveUser.bind(this);
    this._addEndlessScrollingListenter = this._addEndlessScrollingListenter.bind(this);
    this._loadMoreRepos = this._loadMoreRepos.bind(this);
    this._handleRepoClick = this._handleRepoClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.repositories.filters !== nextProps.repositories.filters ||
      this.props.repositories.page !== nextProps.repositories.page) {
      this.setState({filtersChanged: true});
    } else {
      this.setState({filtersChanged: false});
    }
  }

  componentWillMount() {
    this.props.resetRepositories();
  }

  componentDidMount() {
    let username;

    if(!this.props.user.username) {
      username = this.props.match.params.username;
      this.props.fetchUserData(username);
    } else {
      username = this.props.user.username;
    }

    this.props.fetchRepositories(username, 1);
    this._addEndlessScrollingListenter();
  }

  _handleRemoveUser() {
    this.props.history.push('/');
  }

  _handleRepoClick(repoName) {
    const username = this.props.user.username;
    this.props.selectRepository(repoName);
    this.props.history.push(`/${username}/${repoName}`);
  }

  _addEndlessScrollingListenter() {
    window.onscroll = function(e) {
      if(!this.props.repositories.isLastPage) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
          if(!this.props.repositories.isLoading) this._loadMoreRepos();
        }
      }
    }.bind(this);
  }

  _loadMoreRepos() {
    const username = this.props.match.params.username;
    const page = this.props.repositories.page;
    this.props.fetchRepositories(username, page + 1);
  }

  render() {
    const { repositories, user } = this.props;
    let pageContent = <p>Loading...</p>;
    let reposList = repositories.list;

    if(repositories.list.length > 0) {
      if(this.state.filtersChanged) {
        reposList = filterRepos(reposList, repositories.filters);
      }
      pageContent = reposList
        .map((repo, index) => {
          return(
            <Repository key={index} repository={repo} onRepoClick={this._handleRepoClick} />
          )
        });
    } else {
      pageContent = <p>No repository found. Please try again later.</p>;
    }

    return (
      <div>
        <h2>Repositories</h2>
        <p className={s.instruction}>Click on a repository to see it's commits.</p>
        <User onRemoveUser={this._handleRemoveUser} />
        <Filters />
        { repositories.isLoading || user.isLoading && <Loader /> }
        <div className={s.content}>
          <p className={s.total}>Total: {reposList.length} repositories</p>
          { pageContent }
          {(repositories.isLoading && reposList.length > 0 && !repositories.isLastPage) &&
            <p>Loading more repos...</p>}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesPage);
