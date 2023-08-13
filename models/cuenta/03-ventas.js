'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ventas extends Model {
        static associate(models) {
            ventas.belongsTo(models.clientes, {
                foreignKey: 'id_clientes'
            }),
            ventas.hasMany(models.detalle_ventas, {
                foreignKey: 'id_detalle_ventas'
            })
        }
    };
    ventas.init({
        fecha_venta: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_clientes: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ventas',
    });
    return ventas;
};