'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class facturas extends Model {
    static associate(models) {
      
    }
  };
  facturas.init({
    pertenece_a: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigo_factura: {
      type: DataTypes.STRING,
    },
    descuento: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'facturas',
  });
  return facturas;
};