"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tiposClientes extends Model {
    static associate(models) {
      tiposClientes.hasMany(models.clientes, {
        foreignKey: "idTipoCliente",
        onDelete: 'cascade',
      });
    }
  }
  tiposClientes.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descuento: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "tipos_clientes",
    }
  );
  return tiposClientes;
};
