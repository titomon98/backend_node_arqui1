'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ventas extends Model {
    static associate(models) {
     //asociacion con la tabla clientes 
    }
  };
  ventas.init({
    fecha_venta: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total_venta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descuento_aplicado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    monto_iva: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ventas',
  });
  return ventas;
};