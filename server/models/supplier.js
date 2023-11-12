const Sequelize= require("sequelize");
class Supplier extends Sequelize.Model {
    static initiate(sequelize) {
        Supplier.init({
            supplierNum: {
                type: Sequelize.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true,
            },
            supplierName: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            supplierAddress: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: "Supplier",
            tableName: "supplier",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });

    }
    static associate(db) {
        db.Supplier.hasMany(db.Supply,{foreignKey:"supplierNum", sourceKey:"supplierNum"})
    }
}

module.exports = Supplier