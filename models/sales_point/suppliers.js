'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class suppliers extends Model {
        static associate(models) {
            suppliers.hasMany(models.purchaseHeaders, {
                foreignKey: 'id_seller'
            })
        }
    }
    suppliers.init({
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact_email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contact_phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'suppliers'
    });
    return suppliers;
};