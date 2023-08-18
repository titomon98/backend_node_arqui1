'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ventas extends Model {
        static associate(models) {
            ventas.belongsTo(models.cliente, {
                foreignKey: 'id_cliente'
            })
            ventas.hasMany(models.detalle_venta, {
                foreignKey: 'id_venta'
            })
        }
    };

    ventas.init({
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'ventas',
        timestamps: false
    });
    return ventas;

}