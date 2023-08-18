'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DetalleVenta extends Model {
        static associate(models) {
        DetalleVenta.belongsTo(models.clientes, {
            foreignKey: 'id_cliente'
        }),
        DetalleVenta.belongsTo(models.ventas, {
            foreignKey: 'id_venta'
        })
        }
    };
    DetalleVenta.init({
        id_cliente: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        id_venta: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        iva: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        estado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        }, //este no se cambia
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }, //estos no se cambian
    }, {
    sequelize,
    modelName: 'detalleventas',
    });
    return DetalleVenta;
};