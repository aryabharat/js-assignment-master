const {
  body,
  param,
  query,
  oneOf,
  validationResult,
} = require("express-validator");

const postNewsBodyValidator = () => {
  return [
    body("title").isString().trim(),
    body("description").isString().trim(),
    oneOf([body("matchId").isInt({ min: 0 }), body("tourId").isInt({ min: 0 })], {
      message: "matchId or tourId is missing",
    }),
  ];
};

const getNewsQueryValidator = () => {
  return [
    query("limit").optional(),
    query("offset").optional(),
    param("id").isInt({ min: 0 }),
  ];
};

const validateReq = (req, res, next) => {
  const error = validationResult(req, {strictParams: ['body']});
  if (error.isEmpty()) {
    next();
  } else {
    res.status(400).send({ errors: error.array() });
  }
};

module.exports = {
  getNewsQueryValidator,
  postNewsBodyValidator,
  validateReq,
};
