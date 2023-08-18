'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    static associate(models) {
      clientes.belongsTo(models.clientes, {
        foreignKey: 'id_tipoCliente'
      })
      clientes.hasMany(models.ventas, {
        foreignKey: 'id_venta'
      })
    }
  };
  clientes.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nit: {
        type: DataTypes.STRING,     
    },
    contacto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'clientes',
  });
  return clientes;
};