'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    static associate(models) {
      Compra.belongsTo(models.productos, {
        foreignKey: 'id_producto'
      }),
      Compra.hasMany(models.detallecompras, {
        foreignKey: 'id_compra'
      })
    }
  };
  Compra.init({
    id_producto: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    }, //este no se cambia
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }, //estos no se cambian
  }, {
    sequelize,
    modelName: 'compras',
  });
  return Compra;
};