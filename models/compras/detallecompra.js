'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detalle_compras extends Model {
        static associate(models) {
            detalle_compras.belongsTo(models.compras, {
                foreignKey: 'id_compra'
            })
            detalle_compras.belongsTo(models.inventarios, {
                foreignKey: 'id_inventario'
            })
        }
    };
    detalle_compras.init({
        id_compra: {
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
        modelName: 'detalle_compras',
        timestamps: false
    });
    return detalle_compras;
}
    