'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    static associate(models) {
      productos.hasMany(models.compras, {
        foreignKey: 'id_producto'
      }),
      productos.hasMany(models.ventas, {
        foreignKey: 'id_producto'
      })
    }
  };
  productos.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    existencia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    costo: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    precio_venta: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    }, //este no se cambia
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }, //estos no se cambian
  }, {
    sequelize,
    modelName: 'productos',
  });
  return productos;
};