const mysql = require("../lib/mysql");

const getAllTours = async () => {
  const statement = "select * from tours;";
  const parameters = [];
  return await mysql.query(statement, parameters);
};

const getTourById = async (id) => {
  const statement = "SELECT id as tourId, sportId FROM tours WHERE id = ?;";
  const parameters = [id];
  return await mysql.query(statement, parameters);
};

const getMatchesByTourName = async (name, limit, offset) => {
  /**
   *  - This is assuming that a tour will likely to have more then 1k matches in general
   * - We can use ORM instead of raw query
   */
  const statement = `
    SELECT * FROM
    (SELECT * FROM tours WHERE tours.name = ? LIMIT 1)  tour
    LEFT JOIN matches
    ON matches.tourId = tour.id  LIMIT ? OFFSET ?`;
  const parameters = [name, limit, offset];
  return await mysql.query(statement, parameters);
};

module.exports = {
  getAllTours: getAllTours,
  getMatchesByTourName: getMatchesByTourName,
  getTourById: getTourById,
};
