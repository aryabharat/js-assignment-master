const Redis = require("ioredis");
const config = require("../../config/config");

const redisConfig = {
  host: config.redis.host,
  port: config.redis.port,
};

const redisClient = new Redis(redisConfig);

redisClient.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

class Read {
  static getFromRedis = async (key) => {
    const data = await redisClient.get(key);
    if (data) return data ? JSON.parse(data) : null;
  };
}

class Update {
  static setInRedis = (key, value, expirationTime = null) => {
    const serializedValue = JSON.stringify(value);
    if (expirationTime) {
      return redisClient.setex(key, expirationTime, serializedValue);
    } else {
      return redisClient.set(key, serializedValue);
    }
  };
}

class Utils {
  static generateRedisKey = (prefix, separator, ...identifiers) => {
    const key = [prefix, ...identifiers].join(separator);
    return key;
  };
}

module.exports = {
  Read,
  Update,
  Utils,
};
