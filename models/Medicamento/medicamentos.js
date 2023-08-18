'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class medicamentos extends Model {
        static associate(models) {
            medicamentos.hasMany(models.detallesMedicaciones, {
                foreignKey: 'idMedicamento'
            })
        }
    };
    medicamentos.init({
        NombreMedicamento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PrecioMedicamento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Estado: {   
            type: DataTypes.INTEGER,
            allowNull: false
        },       
    }, {
        sequelize,
        modelName: 'medicamentos',
    });
    return medicamentos;
}