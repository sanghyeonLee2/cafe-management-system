const Sequelize = require("sequelize");

class MenuOrder extends Sequelize.Model {
    static initiate(sequelize) {
        MenuOrder.init({
            menuOrderNum: {
                type: Sequelize.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true
            },
            menuOrderPayment: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            menuOrderDate: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            menuOrderTotalPrice:{
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: "MenuOrder",
            tableName: "menu_order",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });

    }

    static associate(db) {
        db.MenuOrder.belongsTo(db.User, {foreignKey: "userId", targetKey: "userId"})
        db.MenuOrder.hasMany(db.OrderDetail, {foreignKey: "menuOrderNum", sourceKey: "menuOrderNum"})
    }
}

module.exports = MenuOrder