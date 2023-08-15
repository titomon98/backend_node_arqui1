'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventarios extends Model {
    static associate(models) {
     //esta tabla esta relacionada con detalla ventas
    }
  };
  inventarios.init({
    nombre: {
      type: DataTypes.DATE,
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
    fecha_vencimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'inventarios',
  });
  return inventarios;
};