'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detalleVentas extends Model {
        static associate(models) {
            detalleVentas.belongsTo(models.ventas, {
                foreignKey: 'idVenta'
            })
        }
    }
    detalleVentas.init({
        idVenta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idInventario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Subtotal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'detalleVentas',
    });