const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { ApolloServer } = require("apollo-server-express");
const { generateToken, authorize } = require("./util/jwt");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const { sequelize } = require("./models");
const { createServer } = require("http");
const debug = require("debug")("server:server");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolver");

app.use(authorize);

try {
  sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully!"))
    .catch((err) => console.log(err));
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

//apollo-server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log("Client connected");
    },
    onDisconnect: (webSocket, context) => {
      console.log("Client disconnected");
    },
  },
  context: ({ req, res }) => ({
    req: req || "",
  }),
});

apolloServer.applyMiddleware({ app });

const ws = createServer(app);
apolloServer.installSubscriptionHandlers(ws);

var port = normalizePort(process.env.PORT || "8000");
ws.listen({ port: port }, () => {
  console.log("server started at port 8000");
});

//ignore for now
ws.on("error", onError);
ws.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = ws.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
