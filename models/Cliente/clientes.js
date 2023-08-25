'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class clientes extends Model {
        static associate(models) {
            clientes.belongsTo(models.tipo_clientes, {
                foreignKey: 'Id_TipoCliente'
            })
        }
    };
    clientes.init({
        Nombre_Cliente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Apellido_Cliente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Id_TipoCliente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'clientes',
    });
    return clientes;
};