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
    NoFactura: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    NombreCliente: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Decripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    NombreProducto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Cantidad: {
      type: DataTypes.INTEGER,
    },
    CantidadIVA: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ventas',
  });
  return facturas;
};