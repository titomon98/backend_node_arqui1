'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ventas extends Model {
        static associate(models) {
            ventas.belongsTo(models.clientes, {
                foreignKey: 'Id_Cliente'
            })
            ventas.hasMany(models.detalle_ventas, {
                foreignKey: 'Id_Venta'
            })
        }
    };
    ventas.init({
        Id_Cliente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Total_Venta : {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Descuento_Aplicado: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        IVA_Venta: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'ventas',
    });
    return ventas;
}