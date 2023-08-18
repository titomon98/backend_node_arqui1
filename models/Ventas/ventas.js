'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ventas extends Model {
        static associate(models) {
            ventas.belongsTo(models.clientes, {
                foreignKey: 'idCliente'
            })
            ventas.hasMany(models.detalleVentas, {  
                foreignKey: 'idVenta'
            })
        }
    };
    ventas.init({
        idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Descuento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CantidadIVA: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'ventas',
    });
    return ventas;
}
