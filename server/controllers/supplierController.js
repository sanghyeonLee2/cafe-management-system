const express = require("express")
const Supplier = require("../models/supplier")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const dataValues = await Supplier.findAll({raw: true})
        console.log(dataValues)
        console.log("1")
        res.status(200).json(dataValues)
    } catch (err) {
        console.log(err.message);
        console.log("2")
        res.status(500).json({error: err.message});
    }
}).post("/", async (req, res) => {
    console.log(req.body)
    const {supplierName, supplierAddress} = req.body;
    try {
        await Supplier.create({supplierName, supplierAddress})
        res.status(200).send("Supplier registered successfully!");
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
}).put("/", async (req, res) => {
    const {supplierNum, supplierInfo} = req.body;
    try {
        await Supplier.update({
                supplierName: supplierInfo.supplierName,
                supplierAddress: supplierInfo.supplierAddress,
            },
            {
                where: {supplierNum},
            }
        )
        res.status(200).send("Supplier update successfully!");
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
}).delete("/", async (req, res) => {
    const {supplierNum} = req.body;
    try {
        await Supplier.destroy({
            where: {supplierNum},
        })
        res.status(200).send("Supplier delete successfully!");
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

module.exports = router