'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipoClientes extends Model {
    static associate(models) {
      tipoClientes.hasMany(models.compras, {
        foreignKey: 'id_tipoCliente'
      })
    }
  };
  tipoClientes.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descuento: {
        type: DataTypes.INTEGER,     
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'tipoClientes',
  });
  return tipoClientes;
};