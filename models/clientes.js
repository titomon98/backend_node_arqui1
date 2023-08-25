"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    static associate(models) {
      clientes.belongsTo(models.tipos_clientes, {
        foreignKey: "idTipoCliente",
      });
      clientes.hasMany(models.facturas, {
        foreignKey: "nitCliente",
        onDelete: 'cascade',
      });
    }
  }
  clientes.init(
    {
      nit: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      idTipoCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "clientes",
    }
  );
  return clientes;
};
