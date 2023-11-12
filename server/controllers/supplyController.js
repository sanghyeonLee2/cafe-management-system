const express = require("express")
const Supply = require("../models/supply")
const SupplyDetail = require("../models/supplyDetail")
const Material = require("../models/material")
const {sequelize} = require("../models/index");
const {Sequelize} = require("sequelize");
const router = express.Router()

router.post("/", async (req, res) => {
    const {supplyPeriodPayment, supplierNum} = req.body.supplyInfo;
    const {materialArr} = req.body;
    const t = await sequelize.transaction();
    try {
        const {supplyNum} = await Supply.create({
            supplierNum,
            supplyPeriodPayment,
        }, {transaction: t})

        let supplyDetailArr = [];
        for (const element of materialArr) {
            const [material, created] = await Material.findOrCreate({
                where: {materialName: element.materialName},
                transaction: t,
                raw: true,
                defaults: element
            })
            if (!created) {
                await Material.update(
                    {
                        materialQuantity: Sequelize.literal(`material_quantity + ${element.materialQuantity}`)
                    },
                    {
                        where: {materialName: material.materialName},
                        transaction: t
                    }
                )
            }
            supplyDetailArr.push({materialNum: material.materialNum})
        }

        supplyDetailArr.map((elem, idx) => {
            elem["supplyNum"] = supplyNum
            elem["supplyDetailQuantity"] = materialArr[idx]["materialQuantity"]
        })

        await SupplyDetail.bulkCreate(supplyDetailArr, {transaction: t})
        await t.commit()
        res.status(200).send("Supply registered successfully!");
    } catch (err) {
        console.log(err.message)
        await t.rollback() // 트랜잭션 롤백(이전 상태로 돌림)
        res.status(500).json({err: err.message});
    }
})

module.exports = router