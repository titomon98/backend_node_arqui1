'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tipo_cliente extends Model {
        static associate(models) {
            tipo_cliente.hasMany(models.clientes, {
                foreignKey: 'id_tipocliente'
            })
        }
    };

    tipo_cliente.init({
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
        timestamps: false
    });
    return tipo_cliente;
}