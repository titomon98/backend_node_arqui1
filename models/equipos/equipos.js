'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class equipos extends Model {
    static associate(models) {
      //aqui va lo de la llave foranea
      equipos.hasMany(models.ligas, {
        foreignKey: 'id_equipo'
      })
    }
  };
  equipos.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    propietario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entrenador: {
        type: DataTypes.STRING,
        allowNull: false
    },
    posicion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'equipos',
  });
  return equipos;
};