'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalleCompras extends Model {
    static associate(models) {
      detalleCompras.belongsTo(models.compras, {
        foreignKey: 'id_compra'
      })
      detalleCompras.belongsTo(models.productos, {
        foreignKey: 'id_producto'
      })
    }
  };
  detalleCompras.init({
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
    id_compra: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'detalleCompras',
  });
  return detalleCompras;
};