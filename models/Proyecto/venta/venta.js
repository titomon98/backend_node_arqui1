'use strict';
const { all } = require('axios');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class venta extends Model {
    static associate(models) {
      venta.hasMany(models.detalle, {
        foreignKey: 'id_venta'
      })
    }
  };
  venta.init({
    TotalVenta: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    IVA: {
        type: DataTypes.DECIMAL(10, 2)
        //si no se especifica que allowNull sea falso, si permite datos nulos
    },
    fechaVenta: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    descuento: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    // id_cliente: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
  }, {
    sequelize,
    modelName: 'venta',
  });
  return venta;
};