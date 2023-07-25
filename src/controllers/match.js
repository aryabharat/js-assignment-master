const Match = require("../models/match");
const RedisManager = require("../lib/redis");

const getAllMatches = async () => {
  return await Match.getAllMatches();
};

const getTourAndSportByMatchId = async (id) => {
  const redisKey = RedisManager.Utils.generateRedisKey("matchId", ":", id);
  const cachedResult = await RedisManager.Read.getFromRedis(redisKey);

  if (cachedResult) return cachedResult;
  else {
    const result = await Match.getTourAndSportByMatchId(id);
    await RedisManager.Update.setInRedis(
      redisKey,
      result,
      60 * 60 * 24 * 10000
    );
    return result;
  }
};

module.exports = {
  getAllMatches: getAllMatches,
  getTourAndSportByMatchId: getTourAndSportByMatchId,
};
