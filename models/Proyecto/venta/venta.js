'use strict';
const { all } = require('axios');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class venta extends Model {
    static associate(models) {
        //RELACIONES
        //DETALLE
        //UNA VENTA TIENE MUCHOS DETALLES
      venta.hasMany(models.detalle, {
        foreignKey: 'id_venta'
      })
      //CLIENTE
        //UNA VENTA PERTENECE A UN CLIENTE
        venta.belongsTo(models.cliente, {
            foreignKey: 'id_cliente'
        })
    }
  };
  venta.init({
    TotalVenta: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    IVA: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fechaVenta: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    descuento: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'venta',
  });
  return venta;
};