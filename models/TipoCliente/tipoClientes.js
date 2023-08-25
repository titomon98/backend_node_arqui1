'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tipo_clientes extends Model {
        static associate(models) {
            tipo_clientes.hasMany(models.clientes, {
                foreignKey: 'Id_TipoCliente'
            })
        }
    };
    tipo_clientes.init({
        Tipo_Cliente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Tipo_Descuento: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'tipo_clientes',
    });
    return tipo_clientes;
};