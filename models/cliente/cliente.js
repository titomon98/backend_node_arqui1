'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class clientes extends Model {
        static associate(models) {
            clientes.belongsTo(models.tipo_cliente, {
                foreignKey: 'id_tipocliente'
            })
            clientes.hasMany(models.ventas, {
                foreignKey: 'id_cliente'
            })
        }
    };
    
    clientes.init({
        nombre: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_tipocliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'clientes',
        timestamps: false
    });

    return clientes;
    
}