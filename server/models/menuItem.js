const Sequelize = require("sequelize");

class MenuItem extends Sequelize.Model {
  static initiate(sequelize) {
    MenuItem.init(
      {
        menuItemNum: {
          type: Sequelize.INTEGER,
          allowNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        menuItemPrice: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        menuItemClassification: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        menuItemIsSpecialMenu: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        menuItemName: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        menuItemImageUrl: {
          type: Sequelize.STRING,
          allowNull: true, // 기존 데이터 유지를 위해 true
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: "MenuItem",
        tableName: "menu_item",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.MenuItem.hasMany(db.MenuRecipe, {
      foreignKey: "menuItemNum",
      sourceKey: "menuItemNum",
    });
    db.MenuItem.hasMany(db.OrderDetail, {
      foreignKey: "menuItemNum",
      sourceKey: "menuItemNum",
    });
  }
}

module.exports = MenuItem;
