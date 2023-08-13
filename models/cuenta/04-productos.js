'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    static associate(models) {
      productos.hasMany(models.detalle_ventas, {
        foreignKey: 'id_detalle_ventas'
      }),
        productos.hasMany(models.detalle_compras, {
          foreignKey: 'id_detalle_compras'
        })
    }
  };
  productos.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'productos',
  });
  return productos;
};
