'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class compras extends Model {
        static associate(models) {
            compras.hasMany(models.detalle_compras, {
                foreignKey: 'id_compra'
            })
            compras.belongsTo(models.proveedores, {
                foreignKey: 'id_proveedor'
            })
        }
    };
    compras.init({
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        IVA: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_proveedor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'compras',
        timestamps: false
    });
    return compras;
}
    