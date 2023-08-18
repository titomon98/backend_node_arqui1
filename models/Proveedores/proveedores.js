'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class proveedores extends Model {
        static associate(models) {
            proveedores.hasMany(models.compras, {
                foreignKey: 'idProveedor'
            })
        }
    };
    proveedores.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'proveedores',
    });
    return proveedores;
}