"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class facturas extends Model {
    static associate(models) {
      facturas.belongsTo(models.clientes, {
        foreignKey: "nitCliente",
      });
      facturas.hasMany(models.detalle_facturas, {
        foreignKey: "idFactura",
        onDelete: 'CASCADE',
      });
    }
  }
  facturas.init(
    {
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      descuentoAplicado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      ivaAplicado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      nitCliente: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "facturas",
    }
  );
  return facturas;
};
