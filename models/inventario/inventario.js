'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class inventarios extends Model {
        static associate(models) {
            inventarios.hasMany(models.detalle_venta, {
                foreignKey: 'id_inventario'
            })
            inventarios.hasMany(models.detalle_compra, {
                foreignKey: 'id_inventario'
            })
        }
    };
    inventarios.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'inventarios',
    });
    return inventarios;
}