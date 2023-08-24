'use strict';
const { all } = require('axios');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class proveedor extends Model {
    static associate(models) {
        // define association here
        // 1 proveedor tiene muchas compras
      proveedor.hasMany(models.venta, {
        foreignKey: 'id_proveedor'
      })
    }
  };
  proveedor.init({
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false   
    },
  }, {
    sequelize,
    modelName: 'proveedor',
    freezeTableName: true,
  });
  return proveedor;
};