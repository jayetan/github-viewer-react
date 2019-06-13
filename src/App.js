import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { getUser, getRepos, getOrgs } from './Api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: '',
      userName: '',
      clientId: '',
      clientSecret: '',
      error: '',
      repos: '',
      orgs: '',
      activeTab: '',
      status: 200,
      statusText: ''
    };
  }

  OnUserSearch = async e => {
    const response = await getUser(this.state.userName);
    this.setState({
      userData: response.status === 200 ? response.data : '',
      status: response.status,
      statusText: response.statusText
    });
  };

  OnInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  OnChangeTab = tab => {
    this.setState({
      activeTab: tab
    });
  };

  OnFetchRepos = async () => {
    const response = await getRepos(this.state.userName);
    this.setState({
      repos: response.status === 200 ? response.data : ''
    });
  };

  OnFetchOrgs = async () => {
    const response = await getOrgs(this.state.userName);
    this.setState({
      orgs: response.status === 200 ? response.data : ''
    });
  };

  OnPerformRequest = () => {
    this.setState({
      orgs: '',
      activeTab: 'repos',
      error: '',
      repos: ''
    });
    const userName = this.state.userName;
    axios
      .all([
        this.OnUserSearch(userName),
        this.OnFetchRepos(userName),
        this.OnFetchOrgs(userName)
      ])
      .then(
        axios.spread(function(acct, perms) {
          // Both requests are now complete
        })
      );
  };

  render() {
    const repos = this.state.repos
      ? this.state.repos.map(repo => {
          return (
            <div className='card mb-3' key={repo.id}>
              <div className='card-body'>
                <h5 className='card-title'>{repo.name}</h5>
                <p className='card-text'>{repo.description}</p>
                <p className='card-text'>
                  <small className='text-muted'>
                    <a
                      href={repo.html_url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      view
                    </a>
                  </small>
                </p>
              </div>
            </div>
          );
        })
      : null;

    const orgs = this.state.orgs
      ? this.state.orgs.map(org => {
          return (
            <div className='card mb-3' key={org.id}>
              <img
                className='card-img-top'
                src={org.avatar_url}
                alt={org.login}
              />
              <div className='card-body'>
                <h5 className='card-title'>{org.login}</h5>
                <p className='card-text'>{org.description}</p>
                <p className='card-text' />
              </div>
            </div>
          );
        })
      : null;

    let tabContentToDisplay;
    if (this.state.activeTab === 'repos') {
      tabContentToDisplay = repos;
    }
    if (this.state.activeTab === 'orgs') {
      tabContentToDisplay = orgs;
    }

    return (
      <div className='container mt-4 mb-4'>
        <h1>Github User Viewer</h1>
        <div className='input-group mt-3'>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Github username'
              aria-label='Username'
              aria-describedby='basic-addon2'
              name='userName'
              onChange={this.OnInputChange}
            />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={this.OnPerformRequest}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className='body mt-3'>
          {this.state.status !== 200 ? (
            <div className='alert alert-danger' role='alert'>
              {this.state.statusText}
            </div>
          ) : null}

          {this.state.userData ? (
            <div className='row'>
              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col lg-6'>
                    <img
                      className='avatar'
                      src={this.state.userData.avatar_url}
                      alt=''
                    />
                    <ul className='list-group'>
                      <li
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                          this.state.activeTab === 'repos' ? 'active' : ''
                        }`}
                        onClick={() => this.OnChangeTab('repos')}
                      >
                        Public Repos
                        <span className='badge badge-primary badge-pill'>
                          {this.state.userData.public_repos}
                        </span>
                      </li>
                      <li
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                          this.state.activeTab === 'orgs' ? 'active' : ''
                        }`}
                        onClick={() => this.OnChangeTab('orgs')}
                      >
                        Organizations
                      </li>
                    </ul>
                  </div>
                  <div className='col-lg-6'>
                    <p>
                      <span className='font-weight-bold'>Name: </span>
                      {this.state.userData.name}
                    </p>
                    <p>
                      <span className='font-weight-bold'>Followers: </span>
                      {this.state.userData.followers}
                    </p>
                    <p>
                      <span className='font-weight-bold'>Joined: </span>
                      {this.state.userData.created_at.substring(0, 10)}
                    </p>
                  </div>
                </div>
              </div>

              <div className='col-lg-4'>
                <div className='list-group'>{tabContentToDisplay}</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
