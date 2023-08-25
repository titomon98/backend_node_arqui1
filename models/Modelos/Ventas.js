'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ventas extends Model {
    static associate(models) {
      Ventas.belongsTo(models.productos, {
        foreignKey: 'id_producto'
      }),
      Ventas.hasMany(models.detalleventas, {
        foreignKey: 'id_venta',
        onDelete: 'cascade',
      })
    }
  };
  Ventas.init({
    id_producto: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
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
    modelName: 'ventas',
  });
  return Ventas;
};