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
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descuento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'tipo_cliente',
        timestamps: false
    });
}