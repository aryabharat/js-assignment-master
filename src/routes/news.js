const News = require("../controllers/news");
const newRouteValidators = require("../middleware/validation/news");

module.exports = function (app) {
  app
    .route("/news")
    .post(
      newRouteValidators.postNewsBodyValidator(),
      newRouteValidators.validateReq,
      async (req, res, next) => {
        try {
          await News.postNews(req.body);
          return res.status(201).send("ok");
        } catch (err) {
          return next(err);
        }
      }
    );

  app
    .route("/news/match/:id")
    .get(
      newRouteValidators.getNewsQueryValidator(),
      newRouteValidators.validateReq,
      async (req, res, next) => {
        try {
          let result = await News.byMatchId(req.params, req.query);
          return res.json(result);
        } catch (err) {
          return next(err);
        }
      }
    );
  app
    .route("/news/tour/:id")
    .get(
      newRouteValidators.getNewsQueryValidator(),
      newRouteValidators.validateReq,
      async (req, res, next) => {
        try {
          let result = await News.byTourId(req.params, req.query);
          return res.json(result);
        } catch (err) {
          return next(err);
        }
      }
    );
  app
    .route("/news/sport/:id")
    .get(
      newRouteValidators.getNewsQueryValidator(),
      newRouteValidators.validateReq,
      async (req, res, next) => {
        try {
          let result = await News.bySportId(req.params, req.query);
          return res.json(result);
        } catch (err) {
          return next(err);
        }
      }
    );
};
