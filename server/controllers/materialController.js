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
}).put("/", async (req, res) => {
    console.log(req.body)
    const {
        materialNum,
        materialUnit,
        materialName,
        materialQuantity
    } = req.body;
    try {
        await Material.update({
                materialUnit,
                materialName,
                materialQuantity
            },
            {
                where: {materialNum},
            }
        )
        res.status(200).send("Material update successfully!");
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
})


module.exports = router;