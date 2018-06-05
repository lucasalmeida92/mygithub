import request from '../utils/request';

export const getRepositoryCommits = (username, repoName, page = 1) => {
  const clientId = '3637542b9793d3c8d09a';
  const clientSecret = '45993e8366ee56902c25b8c8fc61f642cb31a4fd';

  const reposUrl = `https://api.github.com/repos/${username}/${repoName}/commits?client_id=${clientId}&client_secret=${clientSecret}&per_page=10&page=${page}`;

  return request(reposUrl);
}
