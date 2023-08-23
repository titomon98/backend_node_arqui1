'use strict';
const {
    Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class purchaseDetails extends Model {
        static associate(models) {
            purchaseDetails.belongsTo(models.products, {
                foreignKey: 'id_product'
            })
            purchaseDetails.belongsTo(models.purchaseHeaders, {
                foreignKey: 'id_purchase_header'
            })
        }
    }
    purchaseDetails.init({
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false
        },
        iva: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_purchase_header: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'purchaseDetails'
    });
    return purchaseDetails;
};