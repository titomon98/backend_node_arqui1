'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalleCompras extends Model {
    static associate(models) {
      detalleCompras.belongsTo(models.compras, {
        foreignKey: 'idCompra'
      });
      detalleCompras.belongsTo(models.productos, {
        foreignKey: 'idProducto'
      });
    }
  };
  detalleCompras.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cantidad: {
      type: DataTypes.INTEGER
      
    },
    precioUnidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    idCompra: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'detalleCompras',
  });
  return detalleCompras;
};
