'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class presentacions extends Model {
        static associate(models) {
            presentacions.hasMany(models.detallemedicamentos, {
                foreignKey: 'idpresentacion',
            });
        }
    };
    presentacions.init({
        tipopresentacion : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre : {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'presentacions',
    });
    return presentacions;
}