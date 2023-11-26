const express = require("express");
const {
  User,
  SupplyDetail,
  Supply,
  Supplier,
  MenuRecipe,
  Material,
  MenuOrder,
  MenuItem,
} = require("../models");
const { Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");
const router = express.Router();
router
  .get("/users", async (req, res, next) => {
    try {
      const userInfo = await User.findAll({ raw: true });
      res.status(200).json(userInfo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .post("/menus", async (req, res) => {
    const t = await sequelize.transaction();
    const {
      menuItemPrice,
      menuItemClassification,
      menuItemIsSpecialMenu,
      menuItemName,
      finalMenuRecipe,
    } = req.body;
    try {
      const { menuItemNum } = await MenuItem.create(
        {
          menuItemPrice,
          menuItemClassification,
          menuItemIsSpecialMenu,
          menuItemName,
        },
        { transaction: t }
      );

      finalMenuRecipe.map((elem) => {
        elem["menuItemNum"] = menuItemNum;
      });
      console.log("123", finalMenuRecipe);
      await MenuRecipe.bulkCreate(finalMenuRecipe, { transaction: t });
      await t.commit();
      res.status(200).json(menuItemNum);
    } catch (err) {
      await t.rollback();
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  })
  .delete("/menus/:menuItemNum", async (req, res) => {
    const { menuItemNum } = req.params;
    try {
      await MenuItem.destroy({
        where: { menuItemNum },
      });
      res.status(200).json("Supplier delete successfully!");
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  })
  .put("/menus/:menuItemNum", async (req, res) => {
    const { menuItemNum } = req.params;

    const {
      menuItemPrice,
      menuItemClassification,
      menuItemIsSpecialMenu,
      menuItemName,
    } = req.body.menuFormState;
    try {
      await MenuItem.update(
        {
          menuItemPrice,
          menuItemClassification,
          menuItemIsSpecialMenu,
          menuItemName,
        },
        {
          where: { menuItemNum },
        }
      );
      res.status(200).send("Supplier update successfully!");
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  })
  .patch("/menus/recipe/:menuRecipeNum", async (req, res) => {
    const { menuRecipeNum } = req.params;
    const { menuRecipeUsage } = req.body;

    try {
      await MenuRecipe.update(
        { menuRecipeUsage },
        { where: { menuRecipeNum } }
      );
      res.status(200).json({ message: "사용량 수정 완료" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .delete("/menus/recipe/:menuRecipeNum", async (req, res) => {
    const { menuRecipeNum } = req.params;

    try {
      await MenuRecipe.destroy({ where: { menuRecipeNum } });
      res.status(200).json({ message: "레시피 삭제 완료" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .put("/materials", async (req, res, next) => {
    const { materialNum, materialUnit, materialName, materialQuantity } =
      req.body;

    try {
      const [updatedCount] = await Material.update(
        {
          materialUnit,
          materialName,
          materialQuantity,
        },
        {
          where: { materialNum },
        }
      );

      if (updatedCount === 0) {
        return res
          .status(404)
          .json({ message: "해당 재료를 찾을 수 없습니다." });
      }

      res.status(200).json({ message: "재료가 성공적으로 수정되었습니다." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router
  .get("/orders", async (req, res) => {
    try {
      const result = await MenuOrder.findAll({
        include: [
          {
            model: User,
            attributes: ["userId", "userName", "userPhoneNum", "userAddress"],
          },
        ],
        order: [["menuOrderNum", "ASC"]],
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .get("/materials", async (req, res, next) => {
    try {
      const materialInfo = await Material.findAll({ raw: true });
      res.status(200).json(materialInfo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .put("/materials/:materialNum", async (req, res, next) => {
    const { materialNum } = req.params;
    const { materialUnit, materialName, materialQuantity } = req.body;

    try {
      const [updatedCount] = await Material.update(
        {
          materialUnit,
          materialName,
          materialQuantity,
        },
        {
          where: { materialNum },
        }
      );

      if (updatedCount === 0) {
        return res
          .status(404)
          .json({ message: "해당 재료를 찾을 수 없습니다." });
      }

      res.status(200).json({ message: "재료가 성공적으로 수정되었습니다." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .get("/suppliers", async (req, res) => {
    try {
      const dataValues = await Supplier.findAll({ raw: true });
      res.status(200).json(dataValues);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  })
  .post("/suppliers", async (req, res) => {
    const { supplierName, supplierAddress } = req.body;
    try {
      await Supplier.create({ supplierName, supplierAddress });
      res.status(200).send("Supplier registered successfully!");
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  })
  .put("/suppliers/:supplierNum", async (req, res) => {
    const { supplierNum } = req.params;
    const { supplierInfo } = req.body;
    try {
      await Supplier.update(
        {
          supplierName: supplierInfo.supplierName,
          supplierAddress: supplierInfo.supplierAddress,
        },
        {
          where: { supplierNum },
        }
      );
      res.status(200).send("Supplier update successfully!");
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  })
  .delete("/suppliers/:supplierNum", async (req, res) => {
    const { supplierNum } = req.params;
    try {
      await Supplier.destroy({
        where: { supplierNum },
      });
      res.status(200).send("Supplier delete successfully!");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .post("/suppliers/supply", async (req, res) => {
    const { supplyPeriodPayment, supplierNum } = req.body.supplyInfo;
    const { materialArr } = req.body;
    const t = await sequelize.transaction();

    try {
      const { supplyNum } = await Supply.create(
        { supplierNum, supplyPeriodPayment },
        { transaction: t }
      );

      let supplyDetailArr = [];

      for (const element of materialArr) {
        const [materialModel, created] = await Material.findOrCreate({
          where: { materialName: element.materialName },
          defaults: element,
          transaction: t,
        });

        const material = materialModel.get({ plain: true });

        if (!created) {
          await Material.update(
            {
              materialQuantity: Sequelize.literal(
                `material_quantity + ${Number(element.materialQuantity)}`
              ),
            },
            {
              where: { materialName: material.materialName },
              transaction: t,
            }
          );
        }

        supplyDetailArr.push({
          materialNum: material.materialNum,
          supplyNum: supplyNum,
          supplyDetailQuantity: element.materialQuantity,
          supplyDetailPrice: element.materialPrice,
        });
      }

      await SupplyDetail.bulkCreate(supplyDetailArr, { transaction: t });

      await t.commit();
      res.status(200).send("Supply registered successfully!");
    } catch (err) {
      console.log(err.message);
      await t.rollback();
      res.status(500).json({ err: err.message });
    }
  });

module.exports = router;
