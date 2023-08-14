'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detalle_ventas extends Model {
        static associate(models) {
            detalle_ventas.belongsTo(models.ventas, {
                foreignKey: 'id_ventas'
             }),
            detalle_ventas.belongsTo(models.productos, {
                foreignKey: 'id_productos'
            })
        }
    };
    detalle_ventas.init({
        
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        id_ventas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_productos: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'detalle_ventas',
    });
    return detalle_ventas;
};