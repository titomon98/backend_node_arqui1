'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class medicamentos extends Model {
        static associate(models) {
            medicamentos.belongsTo(models.presentaciones, {
                foreignKey: 'idPresentacion'
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
        idPresentacion: {
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