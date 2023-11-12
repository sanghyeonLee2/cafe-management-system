const Sequelize = require("sequelize");

class Material extends Sequelize.Model {
    static initiate(sequelize) {
        Material.init({
            materialName: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            materialUnit: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            materialQuantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            materialNum: {
                type: Sequelize.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: "Material",
            tableName: "material",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Material.hasMany(db.SupplyDetail, {foreignKey: "materialNum", sourceKey: "materialNum"})
    }
}

module.exports = Material