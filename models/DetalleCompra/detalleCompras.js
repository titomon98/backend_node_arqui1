'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detalleCompras extends Model {
        static associate(models) {
            detalleCompras.belongsTo(models.compras, {
                foreignKey: 'Id_Compra'
            })
            detalleCompras.belongsTo(models.inventarios, {
                foreignKey: 'Id_Producto'
            })
        }
    };
    detalleCompras.init({
        Id_Compra: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Id_Producto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Cantidad_Producto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Precio_Compra: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Subtotal_Compra : {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'detalleCompras',
    });
    return detalleCompras;
};  