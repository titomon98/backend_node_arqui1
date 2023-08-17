'use strict';
const { all } = require('axios');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class compra extends Model {
    static associate(models) {
        //RELACIONES
        //DETALLE
        //UNA compra TIENE MUCHOS DETALLES
      compra.hasMany(models.detalleC, {
        foreignKey: 'id_compra'
      })
      //proveedor
        //UNA compra PERTENECE A UN proveedor
        compra.belongsTo(models.proveedor, {
            foreignKey: 'id_proveedor'
        })
    }
  };
  compra.init({
    TotalCompra: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    IVA: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fechaCompra: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'compra',
  });
  return compra;
};