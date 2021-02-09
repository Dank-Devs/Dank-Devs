const { gql } = require("apollo-server-express");

module.exports = gql`
  type Owner {
    id: ID!
    login: String!
    url: String
    avatarUrl: String
  }

  type Nodes {
    name: String!
    owner: Owner!
    stargazerCount: Int
    id: ID!
    url: String
  }

  type RepositoriesContributedTo {
    nodes: [Nodes!]
  }

  type Followers {
    totalCount: Int
  }

  type Following {
    totalCount: Int
  }

  type User {
    login: String!
    name: String!
    repositoriesContributedTo: RepositoriesContributedTo
    bio: String
    email: String
    followers: Followers
    following: Following
    avatarUrl: String
    id: ID!
  }

  type Query {
    user(login: String): User
  }

  type Message {
    to_id: String!
    repo_id: String!
    org_id: String!
    content: String!,
    uuid:String!
  }

  type Mutation {
    sendMessage(
      to_id: String!
      repo_id: String!
      org_id: String!
      content: String!
    ): Message
  }
`;
