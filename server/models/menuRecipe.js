const Sequelize = require("sequelize");

class MenuRecipe extends Sequelize.Model {
    static initiate(sequelize) {
        MenuRecipe.init({
            menuRecipeNum: {
                type: Sequelize.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true
            },
            menuRecipeUsage: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            materialNum: {
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
            modelName: "MenuRecipe",
            tableName: "menu_recipe",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.MenuRecipe.belongsTo(db.Material, {foreignKey: "materialNum", targetKey: "materialNum"})
        db.MenuRecipe.belongsTo(db.MenuItem, {foreignKey: "menuItemNum", targetKey: "menuItemNum"})
    }
}

module.exports = MenuRecipe