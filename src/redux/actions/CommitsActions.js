import { getRepositoryCommits } from '../../services/CommitService';

export const actionTypes = {
  REQUEST_COMMITS: 'REQUEST_COMMITS',
  REQUEST_COMMITS_SUCCESS: 'REQUEST_COMMITS_SUCCESS',
  REQUEST_COMMITS_ERROR: 'REQUEST_COMMITS_ERROR',
  RESET_COMMITS: 'RESET_COMMITS',
};

export const requestCommits = () => ({
  type: actionTypes.REQUEST_COMMITS,
});

export const requestCommitsSuccess = (commits, page) => ({
  type: actionTypes.REQUEST_COMMITS_SUCCESS,
  commits: commits,
  page: page
});

export const requestCommitsError = error => ({
  type: actionTypes.REQUEST_COMMITS_ERROR,
  error
});

export const fetchCommits = (username, repoName, page) => {
  return dispatch => {
    dispatch(requestCommits());

    getRepositoryCommits(username, repoName, page)
      .then(commits => {
        dispatch(requestCommitsSuccess(commits, page));
      }).catch(error => {
        dispatch(requestCommitsError(error));
      });
  };
};

export const resetCommits = () => ({
  type: actionTypes.RESET_COMMITS
});
