import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRepositories, selectRepository } from '../../redux/actions/RepositoriesActions';
import { fetchUserData } from '../../redux/actions/UserActions';
import Repository from './Repository';
import Loader from '../../components/Loader';
import User from '../../components/User';
import s from './index.scss';
import Filters from './Filters';

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
      username: '',
      filtersChanged: false
    };

    this._handleRemoveUser = this._handleRemoveUser.bind(this);
    this._handleRepoClick = this._handleRepoClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.repositories.filters !== nextProps.repositories.filters) {
      this.setState({filtersChanged: true});
    } else {
      this.setState({filtersChanged: false});
    }
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

  _filterRepositories(repos, filters) {
    let filteredRepos = [...repos];

    if(filters.stars) {
      filteredRepos = filteredRepos.filter(repo => {
        if(filters.stars.operation === 'min') {
          return repo.stargazers_count >= filters.stars.count;
        }
        if(filters.stars.operation === 'max') {
          return repo.stargazers_count <= filters.stars.count;
        }
      });
    }

    if(filters.orderBy === 'name_asc') {
      filteredRepos.sort(function (a, b) {
        if(a.name === b.name) return 0;
        return (a.name > b.name) ? 1 : -1;
      });
    }
    if(filters.orderBy === 'name_desc') {
      filteredRepos.sort(function (a, b) {
        if(a.name === b.name) return 0;
        return (a.name < b.name) ? 1 : -1;
      });
    }

    if(filters.orderBy === 'last_modified') {
      filteredRepos.sort(function (a, b) {
        if(a.pushed_at === b.pushed_at) return 0;
        return (a.pushed_at < b.pushed_at) ? 1 : -1;
      });
    }
    if(filters.orderBy === 'first_modified') {
      filteredRepos.sort(function (a, b) {
        if(a.pushed_at === b.pushed_at) return 0;
        return (a.pushed_at > b.pushed_at) ? 1 : -1;
      });
    }

    if(filters.orderBy === 'stars_asc') {
      filteredRepos.sort(function (a, b) {
        if(a.stargazers_count === b.stargazers_count) return 0;
        return (a.stargazers_count > b.stargazers_count) ? 1 : -1;
      });
    }
    if(filters.orderBy === 'stars_desc') {
      filteredRepos.sort(function (a, b) {
        if(a.stargazers_count === b.stargazers_count) return 0;
        return (a.stargazers_count < b.stargazers_count) ? 1 : -1;
      });
    }

    return filteredRepos;
  }

  render() {
    const { repositories, user } = this.props;
    let pageContent = <p>Loading...</p>;
    let reposList = repositories.list;

    if(repositories.list.length > 0) {
      if(this.state.filtersChanged) {
        reposList = this._filterRepositories(reposList, repositories.filters);
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
        <div className={s.content}>
          <p className={s.total}>Total: {reposList.length} repositories</p>
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
