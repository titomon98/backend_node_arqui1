'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detalle_ventas extends Model {
        static associate(models) {
            detalle_ventas.belongsTo(models.ventas, {
                foreignKey: 'id_venta'
            })
            detalle_ventas.belongsTo(models.inventarios, {
                foreignKey: 'id_inventario'
            })
        }
    };

    detalle_ventas.init({
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
        modelName: 'detalle_ventas',
        timestamps: false
    });
    return detalle_ventas;
}   