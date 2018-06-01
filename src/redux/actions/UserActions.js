import { getUserData } from '../../services/UserService';

export const actionTypes = {
  REQUEST_USER_DATA: 'REQUEST_USER_DATA',
  REQUEST_USER_DATA_SUCCESS: 'REQUEST_USER_DATA_SUCCESS',
  REQUEST_USER_DATA_ERROR: 'REQUEST_USER_DATA_ERROR',
  REMOVE_USER: 'REMOVE_USER',
};

export const requestUserData = username => ({
  type: actionTypes.REQUEST_USER_DATA,
  username: username
});

export const requestUserDataSuccess = data => ({
  type: actionTypes.REQUEST_USER_DATA_SUCCESS,
  data: data
});

export const requestUserDataError = error => ({
  type: actionTypes.REQUEST_USER_DATA_ERROR,
  error
});

export const fetchUserData = username => {
  return dispatch => {
    dispatch(requestUserData(username));

    getUserData(username)
      .then(data => {
        dispatch(requestUserDataSuccess(data));
      }).catch(error => {
        dispatch(requestUserDataError(error));
      });
  };
};

export const removeUser = () => ({
  type: actionTypes.REMOVE_USER
});
