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
   
  }, {
    sequelize,
    modelName: 'compras',
  });
  return facturas;
};