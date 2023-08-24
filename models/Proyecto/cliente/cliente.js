'use strict';
const { all } = require('axios');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cliente extends Model {
    static associate(models) {
        // define association here
        // 1 cliente tiene muchas ventas

      cliente.hasMany(models.venta, {
        foreignKey: 'id_cliente'
      })
      // 1 cliente tiene un tipo de cliente
        cliente.belongsTo(models.tipocliente, {
            foreignKey: 'id_tipocliente'
        })
    }
  };
  cliente.init({
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    NIT: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    id_tipocliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'cliente',
    freezeTableName: true,
  });
  return cliente;
};