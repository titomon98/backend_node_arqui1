'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ventas extends Model {
    static associate(models) {
        ventas.belongsTo(models.personas,{
      foreignKey: 'id_persona'
    })  
  }
  };
  ventas.init({
    producto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

  }, {
    sequelize,
    modelName: 'puntodeventa',
  });
  return ventas;
};