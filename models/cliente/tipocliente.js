'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tipo_clientes extends Model {
        static associate(models) {
            tipo_clientes.hasMany(models.clientes, {
                foreignKey: 'id_tipocliente'
            })
        }
    };

    tipo_clientes.init({
        tipocliente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descuento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'tipo_clientes',
    });
    return tipo_clientes;
}