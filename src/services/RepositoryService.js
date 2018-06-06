import request from '../utils/request';
import accessConfig from './github-tokens';

export const getUserRepositories = username => {

  const reposUrl = `https://api.github.com/users/${username}/repos?client_id=${accessConfig.clientId}&client_secret=${accessConfig.clientSecret}&visibility=public&affiliation=owner&sort=pushed&direction=desc`;

  return request(reposUrl);
}
