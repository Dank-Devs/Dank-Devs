const axios = require("axios");

const pubsub = require("../util/pubsub");
const chats = [{ content: "hello" }, { content: "bye" }];
const CHAT_CHANNEL = "CHAT_CHANNEL";

module.exports = {
  Query: {
    ping: () => {
      return "pong";
    },
    chats: (root, args, context) => {
      return chats;
    },
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
                  id
                  url
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
          // console.log(req.access_token);
          // console.log(response.data);
        });

      return name;
    },
  },
  Mutation: {
    sendMessage: (root, { to, content }, {}) => {
      const chat = { to: to, content: content };

      chats.push(chat);
      pubsub.publish("CHAT_CHANNEL", { messageCreated: chat });

      return chat;
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: (root, args, {}) => {
        return pubsub.asyncIterator("CHAT_CHANNEL");
      },
    },
  },
};
