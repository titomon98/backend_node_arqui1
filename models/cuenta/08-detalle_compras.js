'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detalle_compras extends Model {
        static associate(models) {
            detalle_compras.belongsTo(models.compras, {
                foreignKey: 'id_compras'
            }),
            detalle_compras.belongsTo(models.productos, {
                foreignKey: 'id_productos'
            })
        }
    };
    detalle_compras.init({

        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        id_compras: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        iva: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        id_productos: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'detalle_compras',
    });
    return detalle_compras;
};