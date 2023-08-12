'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personas extends Model {
    static associate(models) {
      tipo_clientes.hasMany(models.clientes, {
        foreignKey: 'id_tipo_clientes'
      })
    }
  };
  tipo_clientes.init({
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descuento: {
        type: DataTypes.INTEGER,
        allowNull: false 
    }
  },{
    sequelize,
    modelName: 'tipo_clientes',
  });
  return tipo_clientes;
};