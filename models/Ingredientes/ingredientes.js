'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingredientes extends Model {
    static associate(models) {
        ingredientes.belongsTo(models.comidas, {
            foreignKey: 'id_comida'
          })
    }
  };
  ingredientes.init({
   nombreIngrediente: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precioIngrediente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidadIngrediente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_comida: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ingredientes',
  });
  return ingredientes;
};