'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class proveedores extends Model {
    static associate(models) {
     //tabla se relaciona con inventario y con la tabla de compras
      proveedores.hasMany(models.compras, {
        foreignKey: 'proveedor_id'
      })
    }
  };
  proveedores.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'proveedores',
  });
  return proveedores;
};