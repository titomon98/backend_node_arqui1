'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class invoiceHeaders extends Model {
        static associate(models) {
            invoiceHeaders.belongsTo(models.clients, {
                foreignKey: 'id_client'
            })
            invoiceHeaders.belongsTo(models.sellers, {
                foreignKey: 'id_seller'
            })
            invoiceHeaders.hasMany(models.invoiceDetails, {
                foreignKey: 'id_invoice_header'
            })
        }
    }
    invoiceHeaders.init({
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
        emission_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        certification_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false
        },
        discount: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        iva: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false
        },
        id_client: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_seller: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'invoiceHeaders'
    });
    return invoiceHeaders;
};