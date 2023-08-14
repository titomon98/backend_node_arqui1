'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    static associate(models) {
      productos.hasMany(models.detalle_ventas, {
        foreignKey: 'id_productos'
      }),
        productos.hasMany(models.detalle_compras, {
          foreignKey: 'id_productos'
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
