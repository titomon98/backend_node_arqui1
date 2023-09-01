'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    static associate(models) {
      clientes.hasMany(models.ventas, {
        foreignKey: 'idCliente',
        as: "ventas"
      });
    }
  };
  clientes.init({
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //N = normal
    //F = freceunte
    //M = mayorista
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'clientes',
  });
  return clientes;
};
