const News = require("../models/news");
const Tours = require("../controllers/tour");
const Matches = require("../controllers/match");

/**
 *
 * @param {title:string, description:string, matchId?:number, TourId?:number} params
 */
const postNews = async (params) => {
  if (params.matchId) {
    const { matchId, tourId, sportId } = await Matches.getTourAndSportByMatchId(
      params.matchId
    );
    if (!matchId || !tourId || !sportId)
      throw new Error("Missing required parameter: matchId or tourId"); // TODO update error msg

    return await News.Create.createByMatchId(
      params.title,
      params.description,
      matchId,
      tourId,
      sportId
    );
  } else if (params.tourId) {
    const { tourId, sportId } = await Tours.getTourById(params.tourId);
    if (!tourId || !sportId)
      throw new Error("Missing required parameter: matchId or tourId"); // TODO update error msg
    return await News.Create.createByTourId(
      params.title,
      params.description,
      tourId,
      sportId
    );
  } else {
    throw new Error("Missing required parameter: matchId or tourId");
  }
};

const getNewsByCriteria = async (criteria, params, query) => {
  if (!params.id) {
    throw new Error(`Missing required parameter: ${criteria}Id`);
  }

  let { limit, offset } = query;
  limit = limit ? parseInt(limit) : 10;
  offset = offset ? parseInt(offset) : 0;

  let result;
  switch (criteria) {
    case "match":
      result = await News.Read.byMatchId(params.id, limit + 1, offset);
      break;
    case "tour":
      result = await News.Read.byTourId(params.id, limit + 1, offset);
      break;
    case "sport":
      result = await News.Read.bySportId(params.id, limit + 1, offset);
      break;
    default:
      throw new Error(`Invalid criteria: ${criteria}`);
  }

  return {
    data: result,
    limit,
    offset,
    next: result.length > limit,
  };
};


const byMatchId = async (params, query) => {
  return getNewsByCriteria("match", params, query);
};

const byTourId = async (params, query) => {
  return getNewsByCriteria("tour", params, query);
};

const bySportId = async (params, query) => {
  return getNewsByCriteria("sport", params, query);
};

module.exports = {
  postNews: postNews,
  byMatchId: byMatchId,
  byTourId: byTourId,
  bySportId: bySportId,
};
