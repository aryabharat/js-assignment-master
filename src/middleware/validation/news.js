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
    oneOf([body("matchId").isInt(), body("tourId").isInt()], {
      message: "matchId or tourId is missing",
    }),
  ];
};

const getNewsQueryValidator = () => {
  return [
    query("limit").optional(),
    query("offset").optional(),
    param("id").isInt(),
  ];
};

const validateReq = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
  } else {
    res.status(400).send({ errors: result.array() });
  }
};

module.exports = {
  getNewsQueryValidator,
  postNewsBodyValidator,
  validateReq,
};
