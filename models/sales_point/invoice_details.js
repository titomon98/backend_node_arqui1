'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class invoiceDetails extends Model {
        static associate(models) {
            invoiceDetails.belongsTo(models.products, {
                foreignKey: 'id_product'
            })
            invoiceDetails.belongsTo(models.invoiceHeaders, {
                foreignKey: 'id_invoice_header'
            })
        }
    }
    invoiceDetails.init({
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unit_price: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false
        },
        discount: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false,
            defaultValue: 0.00
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
        id_invoice_header: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'invoiceDetails'
    });
    return invoiceDetails;
};