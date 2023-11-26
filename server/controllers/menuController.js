const express = require("express");
const { Material, MenuRecipe, MenuItem } = require("../models");
const router = express.Router();

router
  .get("/", async (req, res, next) => {
    try {
      const menuItemInfo = await MenuItem.findAll({ raw: true });
      res.status(200).json(menuItemInfo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .get("/recipe/:menuItemNum", async (req, res) => {
    console.log(req.params);
    const { menuItemNum } = req.params;
    try {
      const result = await MenuRecipe.findAll({
        where: { menuItemNum },
        include: [
          {
            model: Material,
            attributes: ["material_name", "material_unit"],
          },
        ],
        raw: true,
        nest: true,
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
