'use strict';
const {
    Model, DataTypes
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class purchaseHeaders extends Model {
        static associate(models) {
            purchaseHeaders.belongsTo(models.suppliers, {
                foreignKey: 'id_supplier'
            })
            purchaseHeaders.hasMany(models.purchaseDetails, {
                foreignKey: 'id_purchase_header'
            })
        }
    }
    purchaseHeaders.init({
        authorization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        series: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dte_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        day: {
            type: DataTypes.DATE,
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
        id_supplier: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'purchaseHeaders'
    });
    return purchaseHeaders;
};