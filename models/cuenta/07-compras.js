'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class compras extends Model {
        static associate(models) {
            compras.belongsTo(models.proveedores, {
                foreignKey: 'id_compras'
            })
        }
    };
    compras.init({
        fecha_compra: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            type: DataTypes.STRING,
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