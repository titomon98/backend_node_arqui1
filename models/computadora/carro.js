'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carros extends Model {
    static associate(models) {
      carros.belongsTo(models.personas, {
        foreignKey: 'id_persona'
      })
    }
  };
  carros.init({
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modelo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    motor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chasis: {
      type: DataTypes.STRING,
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
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
    modelName: 'carros',
  });
  return carros;
};