'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ventas extends Model {
        static associate(models) {
            ventas.belongsTo(models.personas, {
                foreignKey: 'id_mventa'
            })
            
        }
    };
    ventas.init({
        id_mventa: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'ventas',
    });
    return ventas;
}