'use strict';
const { all } = require('axios');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipocliente extends Model {
    static associate(models) {
        // define association here
        // 1:N
      tipocliente.hasMany(models.venta, {
        foreignKey: 'id_tipocliente'
      })
    }
  };
  tipocliente.init({
    normal: {
      type: DataTypes.INTENGER ,
      allowNull: false
    },
    frecuente: {
      type: DataTypes.INTENGER ,
      allowNull: false
    },
    mayorista: {
      type: DataTypes.INTENGER ,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tipocliente',
  });
  return tipocliente;
};