'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class compras extends Model {
        static associate(models) {
            compras.belongsTo(models.proveedores, {
                foreignKey: 'id_proveedores'
            }),
            compras.hasMany(models.detalle_compras, {
                foreignKey: 'id_compras',
                onDelete: 'cascade'
            })
        }
    };
    compras.init({
        fecha_compra: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        id_proveedores: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'compras',
    });
    return compras;
};