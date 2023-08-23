'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class sellers extends Model {
        static associate(models) {
            sellers.hasMany(models.invoiceHeaders, {
                foreignKey: 'id_seller'
            })
        }
    }
    sellers.init({
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'sellers'
    });
    return sellers;
};