const Sequelize= require("sequelize");
class OrderDetail extends Sequelize.Model {
    static initiate(sequelize) {
        OrderDetail.init({
            orderDetailNum: {
                type: Sequelize.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true
            },
            orderDetailQuantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue:1
            },
            menuOrderNum: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            menuItemNum: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: "OrderDetail",
            tableName: "order_detail",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });

    }

    static associate(db) {
        db.OrderDetail.belongsTo(db.MenuOrder,{foreignKey:"menuOrderNum", targetKey:"menuOrderNum"})
        db.OrderDetail.belongsTo(db.MenuItem,{foreignKey:"menuItemNum", targetKey:"menuItemNum"})
    }
}

module.exports = OrderDetail