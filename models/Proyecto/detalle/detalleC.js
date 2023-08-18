'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalleC extends Model {
    static associate(models) {
      // define association here
      // 1 detalleC pertenece a 1 venta
        detalleC.belongsTo(models.compra,{
            foreignKey: 'id_compra'
          })
        // 1 detalleC pertenece a 1 inventario
        detalleC.belongsTo(models.inventario,{
            foreignKey: 'id_inventario'
          })
    }
  };
  detalleC.init({
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    id_inventario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_compra: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'detalleC',
  });
  return detalleC;
};