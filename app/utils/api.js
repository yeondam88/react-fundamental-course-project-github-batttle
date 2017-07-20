import axios from "axios";

const getProfile = async username => {
  const user = await axios.get("https://api.github.com/users/" + username);
  return user.data;
};

const getRepos = async username => {
  const repos = await axios.get(
    "https://api.github.com/users/" + username + "/repos" + "?per_page=100"
  );

  return repos;
};

const getStarCount = repos => {
  return repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0);
};

const calculateScore = (profile, repos) => {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return followers * 3 + totalStars;
};

const getUserData = async player => {
  const info = await Promise.all([getProfile(player), getRepos(player)]);
  const profile = info[0];
  const repos = info[1];

  return {
    profile,
    score: calculateScore(profile, repos)
  };
};

const sortPlayers = players => {
  return players.sort((a, b) => {
    return b.score - a.score;
  });
};

const handleError = error => {
  console.warn(error);
  return null;
};

export const fetchPopularRepos = async language => {
  const encodedURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );
  const repos = await axios.get(encodedURI);

  return repos.data.items;
};

export const battle = async players => {
  try {
    const result = await Promise.all(players.map(getUserData));
    const sorted = sortPlayers(result);
    return sorted;
  } catch (error) {
    handleError(error);
  }
};
