const Sequelize= require("sequelize");

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            userId: {
                type: Sequelize.STRING(10),
                allowNull: true,
                primaryKey: true,
            },
            userAddress: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            userName: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            userPhoneNum: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            userPassword: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: "User",
            tableName: "user",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.User.hasMany(db.MenuOrder, {foreignKey: "userId", sourceKey: "userId"})
    }
}

module.exports = User