const mysql = require("../lib/mysql");

const getAllSportsToursAndMatches = async () => {
  const statement =
    "select s.name as sportName, t.name as tourName, m.name as matchName  m.id as matchId, m.startTime as startTime, m.format as format " +
    "from matches m left join tours t on m.tourId = t.id " +
    "left join sports s on t.sportId = s.id";
  const parameters = [];
  return await mysql.query(statement, parameters);
};

module.exports = {
  getAllSportsToursAndMatches: getAllSportsToursAndMatches,
};
