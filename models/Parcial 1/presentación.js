'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class presentacion extends Model {
    static associate(models) {
      // define association here
      //un presentacion puede tener muchos detalles
      presentacion.hasMany(models.detallemedico, {
        foreignKey: 'id_presentacion'
      })
    }
  };
  presentacion.init({
    tipopresentacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'presentacion',
  });
  return presentacion;
};