'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detalle_ventas extends Model {
        static associate(models) {
            detalle_ventas.belongsTo(models.ventas, {
                foreignKey: 'id_detalle_ventas'
            }),
            detalle_ventas.belongsTo(models.productos, {
                foreignKey: 'id_detalle_ventas'
            })
        }
    };
    detalle_ventas.init({
        id_ventas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_productos: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subtotal: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'detalle_ventas',
    });
    return detalle_ventas;
};