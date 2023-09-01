'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class compras extends Model {
    static associate(models) {
        compras.hasMany(models.detalleCompras, {
        foreignKey: 'idCompra',
        "as": "detalles"
      });
    }
  };
  compras.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    proveedor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2)
    },
    iva: {
      type: DataTypes.DECIMAL(10, 2)
    },
    fecha: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'compras',
  });
  return compras;
};
