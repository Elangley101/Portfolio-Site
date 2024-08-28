// src/components/GitHubRepos.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ReposContainer = styled.div`
  padding: 4rem 2rem;
  background: #f4f4f4;
  text-align: center;
`;

const RepoCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 1rem;
`;

const GitHubRepos = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/your-github-username/repos')
      .then(response => response.json())
      .then(data => setRepos(data));
  }, []);

  return (
    <ReposContainer>
      <h2>My GitHub Repositories</h2>
      <div>
        {repos.map(repo => (
          <RepoCard key={repo.id}>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </RepoCard>
        ))}
      </div>
    </ReposContainer>
  );
};

export default GitHubRepos;
