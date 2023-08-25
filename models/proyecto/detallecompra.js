'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detallecompras extends Model {
    static associate(models) {
     //tabla se relaciona con inventario y con la tabla de compras
      detallecompras.belongsTo(models.inventarios, {
        foreignKey: 'inventario_id'
      })
      
      detallecompras.belongsTo(models.compras, {
        foreignKey: 'compra_id'
      })
    }
  };
  detallecompras.init({
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    }, 
    inventario_id: {
      type: DataTypes.INTEGER,
    },
    compra_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    

  }, {
    sequelize,
    modelName: 'detallecompras',
  });
  return detallecompras;
};