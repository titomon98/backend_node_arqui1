"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class compras extends Model {
    static associate(models) {
      compras.hasMany(models.detalle_compras, {
        foreignKey: "idCompra",
      });
    }
  }
  compras.init(
    {
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      ivaAplicado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      proveedor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "compras",
    }
  );
  return compras;
};
