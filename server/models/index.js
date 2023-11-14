const Sequelize = require("sequelize");
const User = require("./user");
const MenuItem = require("./menuItem");
const Material = require("./material");
const MenuOrder = require("./menuOrder");
const OrderDetail = require("./orderDetail");
const Supplier = require("./supplier");
const Supply = require("./supply");
const SupplyDetail = require("./supplyDetail");
const MenuRecipe = require("./menuRecipe");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Material = Material;
db.MenuOrder = MenuOrder;
db.OrderDetail = OrderDetail;
db.Supplier = Supplier;
db.Supply = Supply;
db.SupplyDetail = SupplyDetail;
db.MenuRecipe = MenuRecipe;
db.MenuItem = MenuItem;

User.initiate(sequelize);
Material.initiate(sequelize);
MenuOrder.initiate(sequelize);
OrderDetail.initiate(sequelize);
Supplier.initiate(sequelize);
Supply.initiate(sequelize);
SupplyDetail.initiate(sequelize);
MenuRecipe.initiate(sequelize);
MenuItem.initiate(sequelize);

User.associate(db);
Material.associate(db);
MenuOrder.associate(db);
OrderDetail.associate(db);
Supplier.associate(db);
Supply.associate(db);
SupplyDetail.associate(db);
MenuRecipe.associate(db);
MenuItem.associate(db);

module.exports = db;
