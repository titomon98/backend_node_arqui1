'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class puestos extends Model {
    static associate(models) {
      puestos.belongsTo(models.personas,{
        foreignKey: 'id_persona'
      })
    }
  };
  puestos.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inicio: {
        type: DataTypes.DATE, //Tipo de dato de fecha y hora
        allowNull: false //no permite datos nulos
    },
    fin: {
        type: DataTypes.DATE, //Tipo de dato de fecha y hora
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_persona: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'puestos',
  });
  return puestos;
};