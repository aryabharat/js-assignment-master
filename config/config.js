const config = {
  development: {
    server: {
      port: 3000,
      host: "localhost",
    },
    database: {
      host: "db",
      port: 3306,
      username: "myuser",
      password: "mypassword",
      database: "mydb",
    },
    redis: {
      host: "redis",
      port: 6379,
    },
    appConfig: {
      paginationDefaultLimit: 10,
      defaultOffset: 0,
      redisKeySeparator: ":",
    },
  },
  test: {
    server: {
      port: 3000,
      host: "localhost",
    },
    database: {
      host: "localhost",
      port: 3306,
      username: "myuser",
      password: "mypassword",
      database: "hostmydb",
    },
    redis: {
      host: "redis",
      port: 6379,
    },
    appConfig: {
      paginationDefaultLimit: 10,
      defaultOffset: 0,
      redisKeySeparator: ":",
    },
  },
};

const env = process.env.NODE_ENV || "development";

const configuration = config[env];

module.exports = configuration;