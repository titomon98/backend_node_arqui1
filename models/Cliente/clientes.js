'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class clientes extends Model {
        static associate(models) {
            clientes.belongsTo(models.tipoClientes, {
                foreignKey: 'idtipoCliente'
            })
            clientes.hasMany(models.ventas, {
                foreignKey: 'idCliente'
            })
        }
    };
    clientes.init({
        nombreCliente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidoCliente: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idtipoCliente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'clientes',
    });
    return clientes;

}
