import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo) => {
      return (<div key={repo.id}>
                <h3>{repo.name}</h3>
                <p>{repo.login}</p>
                <p>{repo.url}</p>
              </div>)
    })}
  </div>
)

export default RepoList;