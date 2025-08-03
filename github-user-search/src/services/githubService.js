import axios from 'axios';

const BASE_URL = 'https://api.github.com';
const QUERY_URL = 'https://api.github.com/search/users?q';

export const searchUsers = async ({ username, location, minRepos, page = 1 }) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
  const queryParts = [];

  if (username) queryParts.push(`${username} in:login`);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>=${minRepos}`);

  const query = queryParts.join('+');
  const url = `${QUERY_URL}=${query}&page=${page}&per_page=10`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: apiKey ? `Bearer ${apiKey}` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

const fetchUserData = async (username) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
  const response = await axios.get(`${BASE_URL}/users/${username}`, {
    headers: {
      Authorization: apiKey ? `Bearer ${apiKey}` : undefined,
    },
  });
  return response.data;
};

export default fetchUserData