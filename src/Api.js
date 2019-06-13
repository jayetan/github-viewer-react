import axios from 'axios';

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

export async function getUser(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getRepos(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?client_id=${clientId}&client_secret=${clientSecret}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getOrgs(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/orgs?client_id=${clientId}&client_secret=${clientSecret}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
}
