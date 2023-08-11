'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comidas extends Model {
    static associate(models) {
      comidas.hasMany(models.ingredientes, {
        foreignKey: 'id_comida'
      })
    }
  };
  comidas.init({
   nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'comidas',
  });
  return comidas;
};