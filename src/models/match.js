const mysql = require("../lib/mysql");

const getAllMatches = async () => {
  const statement = "select * from matches;";
  const parameters = [];
  return await mysql.query(statement, parameters);
};

const getTourAndSportByMatchId = async (id) => {
  const statement =
    "SELECT matchId,tourId,sportId FROM (SELECT tourId,id as matchId FROM matches WHERE id = ?) m LEFT JOIN tours ON tours.id = m.tourId LIMIT 1";
  const parameters = [id];
  const result = await mysql.query(statement, parameters);
  return result[0];
};

module.exports = {
  getAllMatches: getAllMatches,
  getTourAndSportByMatchId: getTourAndSportByMatchId,
};
