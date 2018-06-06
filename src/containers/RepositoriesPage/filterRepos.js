export default (repos, filters) => {
  let filteredRepos = [...repos];

  if(filters.stars) {
    filteredRepos = filteredRepos.filter(repo => {
      if(filters.stars.operation === 'min') {
        return repo.stargazers_count >= filters.stars.count;
      }
      if(filters.stars.operation === 'max') {
        return repo.stargazers_count <= filters.stars.count;
      }
    });
  }

  if(filters.orderBy === 'name_asc') {
    filteredRepos.sort(function (a, b) {
      if(a.name === b.name) return 0;
      return (a.name > b.name) ? 1 : -1;
    });
  }
  if(filters.orderBy === 'name_desc') {
    filteredRepos.sort(function (a, b) {
      if(a.name === b.name) return 0;
      return (a.name < b.name) ? 1 : -1;
    });
  }

  if(filters.orderBy === 'last_modified') {
    filteredRepos.sort(function (a, b) {
      if(a.pushed_at === b.pushed_at) return 0;
      return (a.pushed_at < b.pushed_at) ? 1 : -1;
    });
  }
  if(filters.orderBy === 'first_modified') {
    filteredRepos.sort(function (a, b) {
      if(a.pushed_at === b.pushed_at) return 0;
      return (a.pushed_at > b.pushed_at) ? 1 : -1;
    });
  }

  if(filters.orderBy === 'stars_asc') {
    filteredRepos.sort(function (a, b) {
      if(a.stargazers_count === b.stargazers_count) return 0;
      return (a.stargazers_count > b.stargazers_count) ? 1 : -1;
    });
  }
  if(filters.orderBy === 'stars_desc') {
    filteredRepos.sort(function (a, b) {
      if(a.stargazers_count === b.stargazers_count) return 0;
      return (a.stargazers_count < b.stargazers_count) ? 1 : -1;
    });
  }

  return filteredRepos;
}
