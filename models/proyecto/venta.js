'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ventas extends Model {
    static associate(models) {
     //asociacion con la tabla clientes
      ventas.belongsTo(models.clientes,{
        foreignKey: 'cliente_id'
      })
      //asociacion con la tabla detalle_ventas
      ventas.hasMany(models.detalles,{
        foreignKey: 'venta_id'
      })
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
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ventas',
  });
  return ventas;
};