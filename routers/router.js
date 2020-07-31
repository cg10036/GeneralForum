const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const loginRouter = require("./login");
const registerRouter = require("./register");
const contentRouter = require("./content");
const verifyUser = require("../etc/verifyUser");

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/content", verifyUser.auth, contentRouter);

router.use((req, res) => {
  fs.stat(path.join(__dirname, "html") + req.path, (err) => {
    if (!err) {
      res.sendFile(path.join(__dirname, "html") + req.path);
    } else {
      res.send("File not found.");
    }
  });
});

module.exports = router;
