import { combineReducers } from 'redux';
import user from './UserReducer';
import repositories from './RepositoriesReducer';
import commits from './CommitsReducer';

export default combineReducers({
  user,
  repositories,
  commits
});
