"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    static associate(models) {
      productos.hasMany(models.detalle_facturas, {
        foreignKey: "idProducto",
        onDelete: "cascade",
      });
      productos.hasMany(models.detalle_compras, {
        foreignKey: "idProducto",
        onDelete: "cascade",
      });
    }
  }
  productos.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fabricante: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precioVenta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "productos",
    }
  );
  return productos;
};
