const Sequelize= require("sequelize");
class SupplyDetail extends Sequelize.Model {
    static initiate(sequelize) {
        SupplyDetail.init({
            supplyDetailNum: {
                type: Sequelize.INTEGER,
                allowNull: true,
                primaryKey: true
            },
            supplyDetailQuantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            supplyDetailPrice: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            supplyNum: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            materialNum: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: "SupplyDetail",
            tableName: "supply_detail",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });

    }

    static associate(db) {
        db.SupplyDetail.belongsTo(db.Material,{foreignKey:"materialNum", targetKey:"materialNum"})
        db.SupplyDetail.belongsTo(db.Supply,{foreignKey:"supplyNum", targetKey:"supplyNum"})
    }
}

module.exports = SupplyDetail