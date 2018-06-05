import request from '../utils/request';
import accessConfig from './github-tokens';

export const getRepositoryCommits = (username, repoName, page = 1) => {

  const reposUrl = `https://api.github.com/repos/${username}/${repoName}/commits?client_id=${accessConfig.clientId}&client_secret=${accessConfig.clientSecret}&per_page=10&page=${page}`;

  return request(reposUrl);
}
