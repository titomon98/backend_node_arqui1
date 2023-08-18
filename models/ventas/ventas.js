'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ventas extends Model {
        static associate(models) {
            //Ventas.belongsTo(models.Clientes, { foreignKey: 'id_cliente' });
            //Ventas.belongsTo(models.Productos, { foreignKey: 'id_producto' });
        }
    };
    Ventas.init({
        //Definir los campos del modelo
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
}, {
        sequelize,
        modelName: 'Ventas',
    });
    return Ventas;
}