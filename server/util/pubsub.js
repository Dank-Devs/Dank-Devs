const { RedisPubSub } = require("graphql-redis-subscriptions");

module.exports = new RedisPubSub({
  connection: {
    host: "redis-dev",
    port: 6379,
    retry_strategy: (options) => {
      return Math.max(options.attempt * 100, 3000);
    },
  },
});
