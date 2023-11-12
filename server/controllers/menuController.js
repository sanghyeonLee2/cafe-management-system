const express = require("express");
const MenuItem = require("../models/menuItem")
const MenuRecipe = require("../models/menuRecipe")
const {sequelize} = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const menuItemInfo = await MenuItem.findAll({raw: true})
        res.status(200).json(menuItemInfo)
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}).post("/", async (req, res) => {
        const t = await sequelize.transaction();
        const {
            menuItemPrice,
            menuItemClassification,
            menuItemIsSpecialMenu,
            menuItemName
        } = req.body.menuFormState
        const {finalMenuRecipe} = req.body
        try {
            const {menuItemNum} = await MenuItem.create({
                menuItemPrice,
                menuItemClassification,
                menuItemIsSpecialMenu,
                menuItemName
            }, {transaction: t})

            finalMenuRecipe.map((elem) => {
                elem["menuItemNum"] = menuItemNum
            })
            console.log("123", finalMenuRecipe)
            await MenuRecipe.bulkCreate(finalMenuRecipe, {transaction: t})
            await t.commit()
            res.status(200).json(menuItemNum)
        } catch (err) {
            await t.rollback()
            console.log(err.message)
            res.status(500).json({error: err.message});
        }
    }
).put("/", async (req, res) => {
    const {menuItemNum} = req.body;
    const {
        menuItemPrice,
        menuItemClassification,
        menuItemIsSpecialMenu,
        menuItemName
    } = req.body.menuFormState
    try {
        await MenuItem.update({
                menuItemPrice,
                menuItemClassification,
                menuItemIsSpecialMenu,
                menuItemName
            },
            {
                where: {menuItemNum},
            }
        )
        res.status(200).send("Supplier update successfully!");
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
}).delete("/", async (req, res) => {
    const {menuItemNum} = req.body;
    try {
        await MenuItem.destroy({
            where: {menuItemNum}
        })
        res.status(200).json("Supplier delete successfully!")
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }

})
router.get("/recipe", async (req, res) => {
    const {menuItemNum} = req.query
    try {
        console.log("시작")
        const result = await MenuRecipe.findAll({where: {menuItemNum}})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error: err.message});
    }
    console.log(menuItemNum)
})

module.exports = router;