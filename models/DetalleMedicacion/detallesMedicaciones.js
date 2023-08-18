'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detallesMedicaciones extends Model {
        static associate(models) {
            detallesMedicaciones.belongsTo(models.medicamentos, {
                foreignKey: 'idMedicamento'
            })
            detallesMedicaciones.belongsTo(models.presentaciones, {
                foreignKey: 'idPresentacion'
            })
        }
    };
    detallesMedicaciones.init({
        idMedicamento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idPresentacion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        DescripcionMedicamento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Estado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },     
    }, {
        sequelize,
        modelName: 'detallesMedicaciones',
    });
    return detallesMedicaciones;
}
