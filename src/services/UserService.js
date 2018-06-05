import request from '../utils/request';

export const getUserData = username => {
  const clientId = '3637542b9793d3c8d09a';
  const clientSecret = '45993e8366ee56902c25b8c8fc61f642cb31a4fd';

  const userUrl = `https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`;

  return request(userUrl);
}
