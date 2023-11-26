const express = require("express");
const User = require("../models/user");
const router = express.Router();

async function saveSession(req) {
  return new Promise((resolve, reject) => {
    req.session.save((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

router.post("/signup", async (req, res, next) => {
  const {
    userId,
    userPassword,
    userName,
    userAddress,
    userPhoneNum,
    userIsAdmin,
  } = req.body;
  try {
    await User.create({
      userId,
      userPassword,
      userName,
      userAddress,
      userPhoneNum,
      userIsAdmin,
    });
    res.status(200).send("User registered successfully!");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post("/signin", async (req, res) => {
  const { userId, userPassword } = req.body;
  try {
    const result = await User.findOne({
      where: { userId, userPassword },
      raw: true,
    });

    if (result?.userId) {
      const { userName, userAddress, userPhoneNum, userId, userIsAdmin } =
        result;

      req.session.user = {
        userName,
        userAddress,
        userPhoneNum,
        userId,
        isAdmin: userIsAdmin === 1,
      };

      await saveSession(req);
      res.status(200).json(req.session.user);
      return;
    }

    res.status(401).json({ error: "Invalid credentials" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/signin/success", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(404).json("User not found");
    }

    const userData = {
      ...req.session.user,
      isAdmin:
        req.session.user.isAdmin === 1 || req.session.user.isAdmin === true,
    };

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
