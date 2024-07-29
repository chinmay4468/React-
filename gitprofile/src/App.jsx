import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]);
  const API_URL = "https://api.github.com";

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    try {
      const response = await fetch(`${API_URL}/search/users?q=${username}`);
      const users = await response.json();
      console.log(users.items)
      setResults(users.items);
    } catch (e) {
      console.error(e); // Log error to console
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center">
      <form
        className="border border-gray-300 rounded-lg p-6 bg-white dark:bg-gray-800 shadow-md mt-4 mb-4"
        onSubmit={handleSearch}
      >
        <div className="flex flex-col">
          <h1>GITHUB PROFILE SEARCH</h1>
          <label
            htmlFor="username"
            className="p-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            aria-label="Username input"
          />
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Search
          </button>
        </div>
      </form>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Results:
        </h2>
        {results.length > 0 ? (
          <ul>
            {results.map((result) => (
              <li
                key={result.id}
                className="text-gray-800 dark:text-gray-300 mb-1 inline-block"
              >
                {result.login}
                <img src={result.avatar_url} alt="Profile" width="50" height="50" />
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  {result.url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No results found</p>
        )}
      </div>
    </div>
  );
}

export default App;
