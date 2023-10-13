'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class aeropuertopruebas extends Model {
    static associate(models) {
      
    }
  };
  aeropuertopruebas.init({
    usuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aeropuerto: {
        type: DataTypes.STRING,
        allowNull: false //no permite datos nulos
    },
    visitas: {
        type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_hora: {
        type: DataTypes.STRING,
        allowNull: false
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'aeropuertopruebas',
  });
  return aeropuertopruebas;
};