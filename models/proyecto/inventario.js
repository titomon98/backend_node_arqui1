'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventarios extends Model {
    static associate(models) {
     //esta tabla esta relacionada con detalla ventas
      inventarios.hasMany(models.detalles,{
        foreignKey: 'inventario_id'
      })
      inventarios.hasMany(models.detallecompras,{
        foreignKey: 'inventario_id'
      })
    }
  };
  inventarios.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'inventarios',
  });
  return inventarios;
};