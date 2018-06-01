import request from '../utils/request';

export const getUserData = username => {
  const userUrl = `https://api.github.com/users/${username}`;

  return request(userUrl);
}
