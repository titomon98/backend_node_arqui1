'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipos extends Model {
    static associate(models) {
     //esta tabla esta relacionada con clientes
      tipos.hasMany(models.clientes,{
        foreignKey: 'tipo_id'
      })
    }
  };
  tipos.init({
    nombre: {
      type: DataTypes.DATE,
      allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descuento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'tipos',
  });
  return tipos;
};