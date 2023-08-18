'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalle extends Model {
    static associate(models) {
      // define association here
      // 1 detalle pertenece a 1 venta
        detalle.belongsTo(models.venta,{
            foreignKey: 'id_venta'
          })
        // 1 detalle pertenece a 1 inventario
        detalle.belongsTo(models.inventario,{
            foreignKey: 'id_inventario'
          })
    }
  };
  detalle.init({
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
    id_venta: {
        type: DataTypes.INTEGER,
        allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'detalle',
  });
  return detalle;
};