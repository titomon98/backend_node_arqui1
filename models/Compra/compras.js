'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class compras extends Model {
        static associate(models) {
            compras.hasMany(models.detalleCompras, {
                foreignKey: 'Id_Compra'
            })
        }
    };
    compras.init({
        Fecha_Compra: {
            type: DataTypes.DATE,
            allowNull: false
        },
        IVA_Compra: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'compras',
    });
    return compras;
};
