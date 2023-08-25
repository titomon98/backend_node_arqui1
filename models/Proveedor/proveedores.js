'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class proveedores extends Model {
        static associate(models) {
            proveedores.hasMany(models.detalleCompras, {
                foreignKey: 'Id_Proveedor'
            })
        }
    };
    proveedores.init({
        Nombre_Proveedor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Telefono_Proveedor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'proveedores',
    });
    return proveedores;
};