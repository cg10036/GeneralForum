const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = {
  sign: (payload, next) => {
    jwt.sign(
      payload,
      config.secret,
      {
        expiresIn: "30m",
      },
      next
    );
  },
  verify: (str, next) => {
    jwt.verify(str, config.secret, {}, (err, decoded) => {
      if (err) {
        next(err, undefined);
      } else {
        next(err, decoded.id);
      }
    });
  },
  auth: (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json();
    }
    module.exports.verify(req.headers.authorization, (err, id) => {
      if (err) return res.status(401).json();
      req.id = id;
      next();
    });
  },
};
