import request from '../utils/request';
import accessConfig from './github-tokens';

export const getUserData = username => {

  const userUrl = `https://api.github.com/users/${username}?client_id=${accessConfig.clientId}&client_secret=${accessConfig.clientSecret}`;

  return request(userUrl);
}
