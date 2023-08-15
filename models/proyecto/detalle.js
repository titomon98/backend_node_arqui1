'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalles extends Model {
    static associate(models) {
     //esta tabla esta relacionalda con ventas y productos
    }
  };
  detalles.init({
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'detalles',
  });
  return detalles;
};