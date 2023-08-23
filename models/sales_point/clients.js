'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class clients extends Model {
        static associate(models) {
            clients.belongsTo(models.clientTypes, {
                foreignKey: 'id_client_type'
            })
            clients.hasMany(models.invoiceHeaders, {
                foreignKey: 'id_client'
            })
        }
    }
    clients.init({
        business_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tax_identification: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            defaultValue: 'CF'
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Ciudad'
        },
        id_client_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'clients'
    });
    return clients;
};