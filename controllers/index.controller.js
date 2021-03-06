"use strict";

const indexService = require("../services/index.service");
const responseFormatter = require("../utils/responseFormatter");

const register = (req, res, next) => {
  const { username, email, fullName, password } = req.body;
  const newUser = { username, email, fullName, password };
  indexService
    .register(req, newUser)
    .then(result => {
      const { username, email } = result;
      return responseFormatter.formatResponse(res, { username, email });
    })
    .catch(err => {
      next(err);
    });
};

const login = (req, res, next) => {
  indexService
    .login(req, res)
    .then(result => {
      return responseFormatter.formatResponse(res, result);
    })
    .catch(err => next(err));
};

module.exports = {
  login,
  register
};
