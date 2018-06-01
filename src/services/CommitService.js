import request from '../utils/request';

export const getRepositoryCommits = (username, repoName) => {
  const reposUrl = `https://api.github.com/repos/${username}/${repoName}/commits`;

  return request(reposUrl);
}
