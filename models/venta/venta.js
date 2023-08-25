'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ventas extends Model {
    static associate(models) {
      ventas.belongsTo(models.clientes, {
        foreignKey: 'id_cliente'
      })
      ventas.hasMany(models.detalleVentas, {
        foreignKey: 'id_venta'
      })
    }
  };
  ventas.init({
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ventas',
  });
  return ventas;
};