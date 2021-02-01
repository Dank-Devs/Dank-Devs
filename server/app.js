const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { gql, ApolloServer } = require("apollo-server-express");
const axios = require("axios");
const { generateToken, authorize } = require("./util/jwt");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const { verify } = require("crypto");
const cors = require("cors");
const app = express();

// if(process.env.mode==="dev"){
// app.use(cors({
//   origin: true,
//   preflightContinue: true,
//   credentials: true,
// }));
// }

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

//graphql
const typeDefs = gql`
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
    user: User
  }
`;

const resolvers = {
  Query: {
    user: async (root, args, context) => {
      var data = JSON.stringify({
        query: `query {
          user(login:"vishal19111999") {
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
          console.log(response.data);
        })
        .catch((error) => {
          //   console.log(error);
          console.log(response.data);
        });

      return name;
    },
  },
};

app.use(authorize);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    access_token: req.access_token || "",
  }),
});
server.applyMiddleware({ app });

module.exports = app;
