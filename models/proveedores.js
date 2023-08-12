'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class proveedores extends Model{
        static associate(models){

        }
    };
    proveedores.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contacto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
        }
    },{
        sequelize,
        modelName: 'proveedores',
    });
    return proveedores;
};