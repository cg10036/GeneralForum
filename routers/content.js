const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const verifyUser = require("../etc/verifyUser");
const Content = require("../models/content");

sha512 = (content) => crypto.createHash("sha512").update(content).digest("hex");

router.get("/:num", (req, res) => {
  Content.findOne({ num: req.params.num }, (err, data) => {
    if (err) return res.status(500).json();
    if (!data) return res.status(204).json();
    return res
      .status(202)
      .json({ num: data.num, title: data.title, content: data.content });
  });
});

router.post("/", (req, res) => {
  if (
    !req.body.num ||
    !req.body.page ||
    isNaN(req.body.num) ||
    isNaN(req.body.page)
  ) {
    return res.status(400).json();
  }
  Content.find({})
    .sort({ num: "desc" })
    .skip(req.body.num * (req.body.page - 1))
    .limit(req.body.num)
    .exec((err, data) => {
      if (err) return res.status(500).json();
      if (!data.length) return res.status(204).json();
      return res.status(200).json(data);
    });
});

router.put("/", (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json();
  }
  let content = new Content();
  content.id = req.id;
  content.title = req.body.title;
  content.content = req.body.content;
  content.save((err) => {
    if (err) return res.status(500).json();
    return res.status(201).json();
  });
});

router.patch("/", (req, res) => {
  if (!req.body.num || !req.body.title || !req.body.content) {
    return res.status(400).json();
  }
  Content.update(
    { num: req.body.num, id: req.id },
    { $set: { title: req.body.title, content: req.body.content } },
    (err) => {
      if (err) return res.status(500).json();
      return res.status(202).json();
    }
  );
});

router.delete("/", (req, res) => {
  if (!req.body.num) {
    return res.status(400).json();
  }
  Content.deleteOne({ num: req.body.num, id: req.id }, (err) => {
    if (err) return res.status(500).json();
    return res.status(202).json();
  });
});

module.exports = router;
