"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class detalleCompras extends Model {
    static associate(models) {
        detalleCompras.belongsTo(models.productos, {
            foreignKey: "idProducto",
        });
        detalleCompras.belongsTo(models.compras, {
            foreignKey: "idCompra",
        });
    }
  }
  detalleCompras.init(
    {
      idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idCompra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precioPorUnidad: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },
      precioTotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "detalle_compras",
    }
  );
  return detalleCompras;
};
