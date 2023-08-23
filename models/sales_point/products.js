'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class products extends Model {
        static associate(models) {
            products.hasMany(models.invoiceDetails, {
                foreignKey: 'id_product'
            })
            products.hasMany(models.purchaseDetails, {
                foreignKey: 'id_product'
            })
        }
    }
    products.init({
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        purchase_price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        sale_price: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'products'
    });
    return products;
};