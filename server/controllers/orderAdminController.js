const MenuOrder = require("../models/menuOrder");
const User = require("../models/user");
const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const { userId } = req.query;
  try {
    const result = await MenuOrder.findAll({
      include: [
        {
          model: User,
          where: { userId },
          required: true,
        },
      ],
      raw: true,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
