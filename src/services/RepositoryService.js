import request from '../utils/request';

export const getUserRepositories = username => {
  const reposUrl = `https://api.github.com/users/${username}/repos?visibility=public&affiliation=owner&sort=updated&direction=desc`;

  return request(reposUrl);
}
