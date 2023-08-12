'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ligas extends Model {
    static associate(models) {
      ligas.belongsTo(models.equipos, {
        foreignKey: 'id_equipo'
      })
    }
  };
  ligas.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    posición: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_equipo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ligas',
  });
  return ligas;
};