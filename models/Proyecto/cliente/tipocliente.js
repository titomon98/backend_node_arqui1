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
    tipofrecuencia: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    descuento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'tipocliente',
    freezeTableName: true,
  });
  return tipocliente;
};