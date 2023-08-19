'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detallemedicamentos extends Model {
        static associate(models) {
            detallemedicamentos.belongsTo(models.medicamentos, {
                foreignKey: 'idmedicamento',
            });
            detallemedicamentos.belongsTo(models.presentacions, {
                foreignKey: 'idpresentacion',
            });      
        }
    };
    detallemedicamentos.init({
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'detallemedicamentos',
    });
    return detallemedicamentos;
}