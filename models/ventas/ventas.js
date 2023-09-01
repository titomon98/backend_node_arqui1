'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ventas extends Model {
    static associate(models) {
        ventas.hasMany(models.detalleVentas, {
        foreignKey: 'idVenta',
        as: "detalles"
      });

      ventas.belongsTo(models.clientes, {
        foreignKey: 'idCliente'
      });
    }
  };
  ventas.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    descuento: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    iva: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE
    },
    idCliente: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ventas',
  });
  return ventas;
};
