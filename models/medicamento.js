// Versión: 0.1.0
// Fecha: 2021-10-13
// Comentario: modelo de la tabla medicamento
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class medicamento extends Model {
    static associate(models) {
      // define association here
      //un medicamento puede tener muchos detalles
      medicamento.hasMany(models.detallemedico, {
        foreignKey: 'id_medicamento'
      })
    }
  };
  medicamento.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechavencimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'medicamento',
  });
  return medicamento;
};