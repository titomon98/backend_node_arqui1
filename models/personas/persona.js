'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personas extends Model {
    static associate(models) {
      personas.hasMany(models.carros, {
        foreignKey: 'id_persona'
      })
    }
  };
  personas.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nacimiento: {
        type: DataTypes.DATE, //Tipo de dato de fecha y hora
        allowNull: false //no permite datos nulos
    },
    telefono: {
        type: DataTypes.STRING,
    },
    licencia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'personas',
  });
  return personas;
};