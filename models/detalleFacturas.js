"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class detalleFacturas extends Model {
    static associate(models) {
        detalleFacturas.belongsTo(models.productos, {
            foreignKey: "idProducto",
        });
        detalleFacturas.belongsTo(models.facturas, {
            foreignKey: "idFactura",
        });
    }
  }
  detalleFacturas.init(
    {
      idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idFactura: {
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
      modelName: "detalle_facturas",
    }
  );
  return detalleFacturas;
};
