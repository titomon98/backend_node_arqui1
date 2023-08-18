'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class presentaciones extends Model {
        static associate(models) {
            presentaciones.hasMany(models.inventarios, {
                foreignKey: 'idPresentacion'
            })
        }
    };
    presentaciones.init({
        TipoPresentacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DescripcionPresentacion: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'presentaciones',
    });
    return presentaciones;
}
