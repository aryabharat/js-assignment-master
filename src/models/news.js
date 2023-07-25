const mysql = require("../lib/mysql");
const config = require("../../config/config");
const { paginationDefaultLimit, defaultOffset } = config.appConfig;

class Create {
  static createByMatchId = async (
    title,
    description,
    matchId,
    tourId,
    sportId
  ) => {
    const statement =
      "INSERT INTO news (title,description,matchId,tourId,sportId) VALUES (?,?,?,?,?);";
    const parameters = [title, description, matchId, tourId, sportId];
    return await mysql.query(statement, parameters);
  };

  static createByTourId = async (title, description, tourId, sportId) => {
    const statement =
      "INSERT INTO news (title,description,tourId,sportId) VALUES (?,?,?,?);";
    const parameters = [title, description, tourId, sportId];
    return await mysql.query(statement, parameters);
  };
}

class Read {
  static byTourId = async (
    tourId,
    limit = paginationDefaultLimit,
    offset = defaultOffset
  ) => {
    const statement = "SELECT * FROM news WHERE tourId = ? AND id > ? LIMIT ?";
    const parameters = [tourId, offset, limit];
    return await mysql.query(statement, parameters);
  };
  static bySportId = async (
    sportId,
    limit = paginationDefaultLimit,
    offset = defaultOffset
  ) => {
    const statement = "SELECT * FROM news WHERE sportId = ? AND id > ? LIMIT ?";
    const parameters = [sportId, offset, limit];
    return await mysql.query(statement, parameters);
  };
  static byMatchId = async (
    matchId,
    limit = paginationDefaultLimit,
    offset = defaultOffset
  ) => {
    const statement = "SELECT * FROM news WHERE matchId = ? AND id > ? LIMIT ?";
    const parameters = [matchId, offset, limit];
    return await mysql.query(statement, parameters);
  };
}

module.exports = {
  Read,
  Create,
};
