const OrderDetail = require("../models/orderDetail");
const MenuItem = require("../models/menuItem");
const express = require("express");

const router = express.Router();

router.get("/:menuOrderNum", async (req, res) => {
  const { menuOrderNum } = req.params;
  try {
    const results = await OrderDetail.findAll({
      where: {
        menuOrderNum,
      },
      include: [
        {
          model: MenuItem,
          attributes: [
            "menu_item_name",
            "menu_item_price",
            "menu_item_classification",
            "menu_item_is_special_menu",
          ],
        },
      ],
    });

    res.status(200).json(results);
  } catch (err) {
    console.error("에러:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
