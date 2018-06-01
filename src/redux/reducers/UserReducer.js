import { actionTypes } from '../actions/UserActions';

const initialState = {
  isLoading: false,
  error: false,
  data: null,
  username: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_USER_DATA:
      return {
        ...state,
        isLoading: true,
        data: null,
        username: action.username
      }
    case actionTypes.REQUEST_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.data
      }
    case actionTypes.REQUEST_USER_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case actionTypes.REMOVE_USER:
      return { ...initialState }
    default:
      return state
  }
}
