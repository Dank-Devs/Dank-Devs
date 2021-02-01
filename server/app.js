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
  type Query {
    name: String
  }
`;

const resolvers = {
  Query: {
    name: async (root, args, context) => {
      var data = JSON.stringify({
        query: `query { 
                        viewer { 
                            name
                        }
                    }`,
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
          name = response.data.data.viewer.name;
        })
        .catch((error) => {
          //   console.log(error);
        });

      console.log(context.access_token);
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
