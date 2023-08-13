'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tipo_clientes extends Model {
        static associate(models) {
            tipo_clientes.hasMany(models.clientes, {
                foreignKey: 'id_tipo_clientes'
            })
        }
    };
    tipo_clientes.init({
        nombre: {
            type: DataTypes.DATE,
            allowNull: false
        },
        descuento: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'tipo_clientes',
    });
    return tipo_clientes;
};