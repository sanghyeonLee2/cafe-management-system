const Sequelize= require("sequelize");

class Supply extends Sequelize.Model {
    static initiate(sequelize) {
        Supply.init({
            supplyNum: {
                type: Sequelize.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true,
            },
            supplyPeriodPayment: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            supplierNum: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: "Supply",
            tableName: "supply",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });

    }

    static associate(db) {
        db.Supply.hasMany(db.SupplyDetail,{foreignKey:"supplyNum", sourceKey:"supplyNum"})
        db.Supply.belongsTo(db.Supplier,{foreignKey:"supplierNum", targetKey:"supplierNum"})
    }
}

module.exports = Supply