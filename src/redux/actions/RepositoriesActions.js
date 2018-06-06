import { getUserRepositories } from '../../services/RepositoryService';

export const actionTypes = {
  REQUEST_REPOSITORIES: 'REQUEST_REPOSITORIES',
  REQUEST_REPOSITORIES_SUCCESS: 'REQUEST_REPOSITORIES_SUCCESS',
  REQUEST_REPOSITORIES_ERROR: 'REQUEST_REPOSITORIES_ERROR',
  RESET_REPOSITORIES: 'RESET_REPOSITORIES',
  SELECT_REPOSITORY: 'SELECT_REPOSITORY',
  FILTER_REPOSITORIES: 'FILTER_REPOSITORIES',
};

export const requestRepositories = () => ({
  type: actionTypes.REQUEST_REPOSITORIES,
});

export const requestRepositoriesSuccess = repositories => ({
  type: actionTypes.REQUEST_REPOSITORIES_SUCCESS,
  repositories: repositories
});

export const requestRepositoriesError = error => ({
  type: actionTypes.REQUEST_REPOSITORIES_ERROR,
  error
});

export const fetchRepositories = username => {
  return dispatch => {
    dispatch(requestRepositories());

    getUserRepositories(username)
      .then(repositories => {
        console.log(repositories);
        dispatch(requestRepositoriesSuccess(repositories));
      }).catch(error => {
        dispatch(requestRepositoriesError(error));
      });
  };
};

export const resetRepositories = () => ({
  type: actionTypes.RESET_REPOSITORIES
});

export const selectRepository = (repoName) => ({
  type: actionTypes.SELECT_REPOSITORY,
  repoName: repoName
});

export const filterRepositories = (filters) => ({
  type: actionTypes.FILTER_REPOSITORIES,
  filters: filters
});
