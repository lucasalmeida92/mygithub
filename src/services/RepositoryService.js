import request from '../utils/request';
import accessConfig from './github-tokens';

export const getUserRepositories = (username, page = 1) => {

  const reposUrl = `https://api.github.com/users/${username}/repos?client_id=${accessConfig.clientId}&client_secret=${accessConfig.clientSecret}&visibility=public&affiliation=owner&sort=pushed&direction=desc&per_page=20&page=${page}`;

  return request(reposUrl);
}
