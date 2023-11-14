const MenuOrder = require("../models/menuOrder");
const MenuOrderDetail = require("../models/orderDetail");
const Material = require("../models/material");
const MenuRecipe = require("../models/menuRecipe");
const express = require("express");
const { sequelize } = require("../models");
const { Sequelize } = require("sequelize");
const router = express.Router();

router
  .post("/", async (req, res, next) => {
    const { orderList } = req.body;
    const { menuOrderPayment, userId, menuOrderTotalPrice } =
      req.body.menuOrder;
    console.log("orderList", orderList);
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
      orderList.map((elem) => {
        elem["menuOrderNum"] = menuOrderNum;
      });
      await MenuOrderDetail.bulkCreate(orderList, { transaction: t });
      //await MenuRecipe.

      for (const element of orderList) {
        const material = await MenuRecipe.findOne({
          attributes: ["materialNum"],
          where: { menuItemNum: element.menuItemNum },
          transaction: t,
        });
        //MenuRecipe.findOne을 통해 반환된 값은 객체입니다.
        //이 객체를 Material.update에서 where 절에 바로 사용하려고 하면 에러가 발생합니다.
        //왜냐하면 where 절은 materialNum 필드의 정수 값을 기대하기 때문입니다.
        const materialNum = material.get("materialNum"); //material 인스턴스에서 'materialNum' 속성의 값을 가져와서 materialNum이라는 변수에 저장하라"

        await Material.update(
          {
            materialQuantity: Sequelize.literal(
              `material_quantity - ${element.orderDetailQuantity}`
            ),
          },
          {
            where: { materialNum },
            transaction: t,
          }
        );
      }
      await t.commit();
      res.status(200).json("Order registered successfully!");
    } catch (err) {
      console.log(err.message);
      await t.rollback(); // 트랜잭션 롤백(이전 상태로 돌림)
      res.status(500).json({ error: err.message });
    }
  })
  .get("/", async (req, res) => {
    const { userId } = req.query;
    try {
      const result = await MenuOrder.findAll({ where: { userId }, raw: true });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .get("/info", async (req, res) => {
    const { menuOrderNum } = req.query;
    console.log("!@#!@", menuOrderNum);
    try {
      const query = `SELECT * FROM order_detail a INNER JOIN menu_item b ON 
a.menu_item_num = b.menu_item_num WHERE a.menu_item_num IN (SELECT menu_item_num FROM cafe_management.order_detail WHERE menu_order_num = ${menuOrderNum}) and a.menu_order_num = ${menuOrderNum}`;
      const [results, matadata] = await sequelize.query(query);
      console.log(results);

      res.status(200).json(results);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
