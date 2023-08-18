'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tipoClientes extends Model {
        static associate(models) {
            tipoClientes.hasMany(models.clientes, {
                foreignKey: 'idtipoCliente'
            })
        }
    };
    tipoClientes.init({
        tipoCliente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PorcentajeDescuento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'tipoClientes',
    });
    return tipoClientes;
}


