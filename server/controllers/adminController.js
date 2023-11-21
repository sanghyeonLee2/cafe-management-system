const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const userInfo = await User.findAll({ raw: true });
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
