'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detalle_compra extends Model {
        static associate(models) {
            detalle_compra.belongsTo(models.compras, {
                foreignKey: 'id_compra'
            })
            detalle_compra.belongsTo(models.inventarios, {
                foreignKey: 'id_inventario'
            })
        }
    };
    detalle_compra.init({
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
        modelName: 'detalle_compra',
        timestamps: false
    });
    return detalle_compra;
}
    