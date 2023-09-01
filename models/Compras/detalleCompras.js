'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detalleCompras extends Model {
        static associate(models) {
            detalleCompras.belongsTo(models.compras, {
                foreignKey: 'idCompra'
            })
            detalleCompras.belongsTo(models.inventarios, {
                foreignKey: 'idInventario'
            })
        }
    };
    detalleCompras.init({
        idCompra: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idinventario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Subtotal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'detalleCompras',
    });
    return detalleCompras;
}

