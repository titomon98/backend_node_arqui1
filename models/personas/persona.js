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
    informacion: {
        type:DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
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