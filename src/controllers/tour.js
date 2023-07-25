const Tour = require("../models/tour");
const RedisManager = require("../lib/redis");
const { paginationDefaultLimit, defaultOffset, redisKeySeparator } = require('../../config/config').appConfig

const getAllTours = async () => {
  return await Tour.getAllTours();
};

const getTourById = async (id) => {
  const redisKey = RedisManager.Utils.generateRedisKey(
    "tourId",
    redisKeySeparator,
    id
  );
  const cachedResult = await RedisManager.getFromRedis(redisKey);

  if (cachedResult) return cachedResult;
  else {
    const result = await Tour.getTourById(id);
    await RedisManager.setInRedis(redisKey, result, 60 * 60 * 24 * 10000);
    return result;
  }
};

const getMatchesByTourName = async (params) => {
  const { name, limit, offset } = params;
  limit = limit ? parseInt(limit) : paginationDefaultLimit;
  offset = offset ? parseInt(offset) : defaultOffset;

  if (!name) {
    throw new Error("Missing required parameter: name");
  }

  const result = await Tour.getMatchesByTourName(name, limit + 1, offset);
  return {
    data: result,
    limit,
    offset,
    next: result.length > limit,
  };
};

module.exports = {
  getAllTours: getAllTours,
  getMatchesByTourName: getMatchesByTourName,
  getTourById: getTourById,
};
