import { actionTypes } from '../actions/CommitsActions';

const initialState = {
  isLoading: false,
  error: false,
  page: 0,
  isLastPage: false,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_COMMITS:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.REQUEST_COMMITS_SUCCESS:
      return {
        ...state,
        list: state.list.concat(action.commits),
        isLastPage: action.commits.length < 10,
        page: action.page,
        isLoading: false,
        error: null
      }
    case actionTypes.REQUEST_COMMITS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case actionTypes.RESET_COMMITS:
      return {
        ...initialState,
        page: 1
      }
    default:
      return state
  }
}
