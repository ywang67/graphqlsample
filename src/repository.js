// React
import React from 'react';

// GraphQL
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const GetRepositoryInfoQuery = gql(`
  query GetRepositoryIssues($name: String!, $login: String!) {
    repositoryOwner(login: $login) {
      repository(name: $name) {
        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
      }
    }
  }
`);

const withInfo = graphql(GetRepositoryInfoQuery, Repository);

// Repository
class Repository extends React.Component {
  constructor(props) {
    super(props);
    console.log('props: ', props);

    // states
    this.state = {
      login: props.login,
      name: props.name,
      stargazers: 0,
      watchers: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    // DRY
    console.log('next props: ', nextProps);
    const repo = nextProps.data.repositoryOwner.repository;

    // states
    this.setState({
      login: this.props.login,
      name: this.props.name,
      stargazers: repo.stargazers.totalCount,
      watchers: repo.watchers.totalCount
    });
  }

  render() {
    return (<div>
      <h2>{this.state.login}/{this.state.name}</h2>
      <ul>
        <li>stargazers: {this.state.stargazers.toLocaleString()}</li>
        <li>watchers: {this.state.watchers.toLocaleString()}</li>
      </ul>
    </div>)
  }
}

const RepositoryWithInfo = withInfo(Repository);
export default RepositoryWithInfo;
