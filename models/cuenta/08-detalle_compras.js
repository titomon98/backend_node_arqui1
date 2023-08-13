'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detalle_compras extends Model {
        static associate(models) {
            detalle_compras.belongsTo(models.compras, {
                foreignKey: 'id_detalle_compras'
            }),
            detalle_compras.belongsTo(models.productos, {
                foreignKey: 'id_detalle_compras'
            })
        }
    };
    detalle_compras.init({
        id_compras: {
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
        precio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subtotal: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'detalle_compras',
    });
    return detalle_compras;
};