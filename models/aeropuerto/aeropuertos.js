'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class aeropuertos extends Model {
    static associate(models) {
      
    }
  };
  aeropuertos.init({
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
        type: DataTypes.DATE, 
        allowNull: false
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'aeropuertos',
  });
  return aeropuertos;
};