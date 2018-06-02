import { actionTypes } from '../actions/RepositoriesActions';

const initialState = {
  isLoading: false,
  error: false,
  list: [],
  selectedRepository: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_REPOSITORIES:
      return {
        ...state,
        isLoading: true,
        list: []
      }
    case actionTypes.REQUEST_REPOSITORIES_SUCCESS:
      return {
        ...state,
        list: action.repositories,
        isLoading: false,
        error: null
      }
    case actionTypes.REQUEST_REPOSITORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case actionTypes.RESET_REPOSITORIES:
      return {
        ...initialState
      }
    case actionTypes.SELECT_REPOSITORY:
      let selectedRepository = state.list.filter(repo => (
        repo.name == action.repoName
      ))[0];

      return {
        ...state,
        selectedRepository
      }
    default:
      return state
  }
}
