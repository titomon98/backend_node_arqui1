'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalleVentas extends Model {
    static associate(models) {
      detalleVentas.belongsTo(models.ventas, {
        foreignKey: 'id_venta'
      })
      detalleVentas.belongsTo(models.productos, {
        foreignKey: 'id_producto'
      })
    }
  };
  detalleVentas.init({
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subTotal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    iva: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'detalleVentas',
  });
  return detalleVentas;
};