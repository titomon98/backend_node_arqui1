'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventarios extends Model {
    static associate(models) {

    }
  };
  inventarios.init({
    NombreProducto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Cantidad: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precioProducto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DescricionProducto: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'inventarios',
  });
  return inventarios;
};