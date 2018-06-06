import { actionTypes } from '../actions/RepositoriesActions';

const initialState = {
  isLoading: false,
  error: false,
  page: 1,
  isLastPage: false,
  list: [],
  selectedRepository: null,
  filters: {
    stars: {
      count: 0,
      operation: 'min'
    },
    orderBy: 'last_modified'
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_REPOSITORIES:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.REQUEST_REPOSITORIES_SUCCESS:
      return {
        ...state,
        list: state.list.concat(action.repositories),
        isLastPage: action.repositories.length < 20,
        page: action.page,
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
        repo.name === action.repoName
      ))[0];

      return {
        ...state,
        selectedRepository
      }
    case actionTypes.FILTER_REPOSITORIES:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.filters
        }
      }
    default:
      return state
  }
}
