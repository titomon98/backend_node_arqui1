'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class compras extends Model {
    static associate(models) {
      
     //tabla se relaciona con los proveedores
      compras.belongsTo(models.proveedores, {
        foreignKey: 'proveedor_id'
      })
      compras.hasMany(models.detallecompras,{
        foreignKey: 'compra_id'
      })
      
    }
  };
  compras.init({
    fecha_compra: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total_compra: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    monto_IVA: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    proveedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'compras',
  });
  return compras;
};