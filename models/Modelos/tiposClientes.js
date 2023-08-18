'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_clientes extends Model {
    static associate(models) {
      tipo_clientes.hasMany(models.clientes, {
        foreignKey: 'id_tipo_cliente'
      })
    }
  };
  tipo_clientes.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descuento:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    }, //este no se cambia
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }, //estos no se cambian
  }, {
    sequelize,
    modelName: 'tipo_clientes',
  });
  return tipo_clientes;
};