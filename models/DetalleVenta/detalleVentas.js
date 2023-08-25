'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class detalle_ventas extends Model {
        static associate(models) {
            detalle_ventas.belongsTo(models.ventas, {
                foreignKey: 'Id_Venta'
            })
            detalle_ventas.belongsTo(models.inventarios, {
                foreignKey: 'Id_Producto'
            })
        }
    };
    detalle_ventas.init({
        Id_Venta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Id_Producto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Precio_Venta: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Subtotal_Venta : {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'detalle_ventas',
    });
    return  detalle_ventas;
};