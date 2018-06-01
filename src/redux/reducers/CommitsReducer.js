import { actionTypes } from '../actions/CommitsActions';

const initialState = {
  isLoading: false,
  error: false,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_COMMITS:
      return {
        ...state,
        isLoading: true,
        list: []
      }
    case actionTypes.REQUEST_COMMITS_SUCCESS:
      return {
        ...state,
        list: action.commits,
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
        ...initialState
      }
    default:
      return state
  }
}
