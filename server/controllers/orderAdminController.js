const MenuOrder = require("../models/menuOrder")
const User = require("../models/user")
const express = require("express");
const {sequelize} = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
    const {userId} = req.query;
   try {
       const result = await MenuOrder.findOne({
           include: [
               {
                   model: User,
                   attributes: ["menuOrderNum", "menuOrderPayment", "menuOrderDate", "userId", "menuOrderTotalPrice", "userAddress", "userName", "userPhoneNum"],
                   where: {userId},
               }
           ]
       })
       console.log(result)
   }
   catch (err) {
       console.log(err.message)
   }

})

module.exports = router;