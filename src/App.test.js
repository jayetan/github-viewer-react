import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { getUser, getRepos, getOrgs } from './Api';

describe('/', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('GET /api.github.com/users/:username', () => {
  it('should return github user', async () => {
    const res = await getUser('patzmatias');
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('name');
  });

  it('should return 404 if user is not found', async () => {
    const res = await getUser('1234qweqwwqe');
    expect(res.status).toBe(404);
  });
});

describe('GET /api.github.com/users/:username/repos', () => {
  it('should return github repositories', async () => {
    const res = await getRepos('patzmatias');
    expect(res.status).toBe(200);
    expect(res.data).not.toBeNull();
  });
});

describe('GET /api.github.com/users/:username/orgs', () => {
  it('should return github organizations', async () => {
    const res = await getOrgs('patzmatias');
    expect(res.status).toBe(200);
    expect(res.data).not.toBeNull();
  });
});
