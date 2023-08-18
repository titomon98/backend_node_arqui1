'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detalle_venta extends Model {
        static associate(models) {
            detalle_venta.belongsTo(models.ventas, {
                foreignKey: 'id_venta'
            })
            detalle_venta.belongsTo(models.inventarios, {
                foreignKey: 'id_inventario'
            })
        }
    };

    detalle_venta.init({
        id_venta: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_inventario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'detalle_venta',
        timestamps: false
    });
}   