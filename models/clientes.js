'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class clientes extends Model {
        static associate(models) {
            clientes.belongsTo(models.tipo_clientes, {
                foreignKey: 'id_tipo_clientes'
            }),
            clientes.hasMany(models.ventas, {
                foreignKey: 'id_ventas'
            })
        }
    };
    clientes.init({
        nombres: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_tipo_clientes: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'clientes',
    });
    return clientes;
};