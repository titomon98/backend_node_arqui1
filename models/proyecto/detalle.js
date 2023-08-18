'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalles extends Model {
    static associate(models) {
     //esta tabla esta relacionalda con ventas y productos
      detalles.belongsTo(models.ventas,{
        foreignKey: 'venta_id'
      })
      detalles.belongsTo(models.inventarios,{
        foreignKey: 'inventario_id'
      })
    }
  };
  detalles.init({
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    venta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    inventario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'detalles',
  });
  return detalles;
};