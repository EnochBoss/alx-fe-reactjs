import React, { useState } from 'react';
import fetchUserData, { searchUsers } from '../services/githubService';

const Search = () => {
  const [form, setForm] = useState({ username: '', location: '', minRepos: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);
    setPage(1);

    try {
      const data = await searchUsers({ ...form, page: 1 });
      const detailedUsers = await Promise.all(data.items.map((user) => fetchUserData(user.login)));
      setResults(detailedUsers);
      setHasMore(data.total_count > 10);
    } catch {
      setError('Something went wrong or Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoading(true);

    try {
      const data = await searchUsers({ ...form, page: nextPage });
      const detailedUsers = await Promise.all(data.items.map((user) => fetchUserData(user.login)));
      setResults(prev => [...prev, ...detailedUsers]);
      setHasMore(data.total_count > nextPage * 10);
    } catch {
      setError('Failed to load more users.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. torvalds"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. San Francisco"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Minimum Repositories</label>
          <input
            type="number"
            name="minRepos"
            value={form.minRepos}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. 10"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-blue-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-6 space-y-4">
        {results.map((user) => (
          <div key={user.id} className="flex items-center space-x-4 border p-4 rounded shadow-sm">
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
              <p className="text-sm text-gray-600">Location: {user.location || 'N/A'}</p>
              <p className="text-sm text-gray-600">Repos: {user.public_repos}</p>
              <a href={user.html_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                GitHub Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <button onClick={loadMore} className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;