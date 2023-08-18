'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleCompra extends Model {
    static associate(models) {
        DetalleCompra.belongsTo(models.Compra, {
        foreignKey: 'id_compra'
      })
    }
  };
  DetalleCompra.init({
    id_compra: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      iva: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      }, //este no se cambia
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }, //estos no se cambian
  }, {
    sequelize,
    modelName: 'DetalleCompra',
  });
  return DetalleCompra;
};