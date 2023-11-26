const MenuOrder = require("../models/menuOrder");
const User = require("../models/user");
const MenuOrderDetail = require("../models/orderDetail");
const Material = require("../models/material");
const MenuRecipe = require("../models/menuRecipe");
const { sequelize } = require("../models");
const { Sequelize } = require("sequelize");
const express = require("express");
const router = express.Router();

router
  .post("/order", async (req, res, next) => {
    const { orderList } = req.body;
    const { menuOrderPayment, userId, menuOrderTotalPrice } =
      req.body.menuOrder;
    const t = await sequelize.transaction();

    try {
      const { menuOrderNum } = await MenuOrder.create(
        {
          menuOrderPayment,
          userId,
          menuOrderTotalPrice,
        },
        { transaction: t }
      );

      orderList.forEach((elem) => {
        elem["menuOrderNum"] = menuOrderNum;
      });

      await MenuOrderDetail.bulkCreate(orderList, { transaction: t });

      for (const element of orderList) {
        const recipes = await MenuRecipe.findAll({
          attributes: ["materialNum", "menuRecipeUsage"],
          where: { menuItemNum: element.menuItemNum },
          transaction: t,
        });

        for (const recipe of recipes) {
          const materialNum = recipe.get("materialNum");
          const usage = recipe.get("menuRecipeUsage");
          const totalUsage = usage * element.orderDetailQuantity;

          const material = await Material.findOne({
            attributes: ["materialQuantity"],
            where: { materialNum },
            transaction: t,
          });

          if (!material) {
            throw new Error(`재료 번호 ${materialNum}를 찾을 수 없습니다.`);
          }

          const currentStock = material.get("materialQuantity");
          if (currentStock < totalUsage) {
            throw new Error(
              `재료 번호 ${materialNum}의 재고가 부족합니다. (현재: ${currentStock}, 필요: ${totalUsage})`
            );
          }

          await Material.update(
            {
              materialQuantity: Sequelize.literal(
                `material_quantity - ${totalUsage}`
              ),
            },
            {
              where: { materialNum },
              transaction: t,
            }
          );
        }
      }

      await t.commit();
      res.status(200).json("Order registered successfully!");
    } catch (err) {
      console.error(err.message);
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  })
  .get("/orders", async (req, res, next) => {
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
      });
      res.status(200).json(result);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
