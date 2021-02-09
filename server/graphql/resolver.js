const axios = require("axios");

module.exports = {
    Query: {
      user: async (root, args, context) => {
        var data = JSON.stringify({
          query: `query {
            user(login:"${args.login}") {
              login
              name
              repositoriesContributedTo(contributionTypes: PULL_REQUEST, first: 50, orderBy: {field: STARGAZERS, direction: DESC}) {
                nodes {
                  name
                  owner {
                    id
                    login
                    url
                    avatarUrl
                  }
                  stargazerCount
                }
              }
              bio
              email
              followers {
                totalCount
              }
              following {
                totalCount
              }
              avatarUrl
              id
            }
          }
          `,
          variables: {},
        });
  
        var config = {
          method: "post",
          url: "https://api.github.com/graphql",
          headers: {
            Authorization: `Bearer ${context.access_token}`,
            "Content-Type": "application/json",
          },
          data: data,
        };
  
        let name = "not found";
  
        await axios(config)
          .then((response) => {
            name = response.data.data.user;
            console.log(args.login);
          })
          .catch((error) => {
            console.log(error);
            console.log(response.data);
          });
  
        return name;
      },
    },
    Mutation:{
      sendMessage: async (root, args, context) => {
        return "new message created!"
      }
    }
  };