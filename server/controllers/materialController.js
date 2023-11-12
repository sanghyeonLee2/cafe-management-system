const express = require("express");
const router = express.Router();
const Material = require("../models/material")

router.get("/", async (req, res, next) => {
    try {
        const materialInfo = await Material.findAll({raw: true})
        res.status(200).json(materialInfo)
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/*router.post("/signin", async (req, res) => {
    const {userId, userPassword} = req.body;
    try {
        const {dataValues} = await User.findOne({
            where: {
                userId, userPassword
            },
        })
        if (dataValues.userId) {
            const {userName, userAddress, userPhoneNum, userId} = dataValues
            req.session.user = {
                userName, userAddress, userPhoneNum, userId
            };
            await saveSession(req);
            res.status(200).json(req.session.user);
            return;
        }
        res.status(401).json({error: "Invalid credentials"});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

router.get("/signin/success", async (req, res) => {
    try {
        res.status(200).json(req.session.user);
    }
    catch (err){
        res.status(404).json("User not found")
    }
})*/
module.exports = router;