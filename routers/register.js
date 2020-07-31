const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const User = require("../models/user");

sha512 = (content) => crypto.createHash("sha512").update(content).digest("hex");

router.post("/", (req, res) => {
  if (!req.body.id || !req.body.pw) {
    return res.status(400).json();
  }
  User.find({ id: req.body.id }, (err, data) => {
    if (err) return res.status(500).json();
    if (data.length != 0) {
      return res.status(409).json();
    } else {
      let user = new User();
      user.id = req.body.id;
      user.pw = sha512(req.body.pw);
      user.save((err) => {
        if (err) return res.status(500).json();
        return res.status(201).json();
      });
    }
  });
});

module.exports = router;
