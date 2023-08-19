'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class medicamentos extends Model {
        static associate(models) {
            medicamentos.hasMany(models.detallemedicamentos, {
                foreignKey: 'idmedicamento',
            });
        }
    };
    medicamentos.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'medicamentos',
    });
    return medicamentos;
}