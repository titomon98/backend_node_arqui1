'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class compras extends Model {
        static associate(models) {
            compras.hasMany(models.detalleCompras, {
                foreignKey: 'idCompra'
            })
            compras.belongsTo(models.proveedores, {
                foreignKey: 'idProveedor'
            })
        }
    };
    compras.init({
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        idProveedor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Descuento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CantidadIVA: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'compras',
    });
    return compras;
}
