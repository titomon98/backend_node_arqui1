'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    static associate(models) {
      clientes.belongsTo(models.tipo_clientes, {
        foreignKey: 'id_tipo_cliente'
      }),
      clientes.hasMany(models.detalleventas, {
        foreignKey: 'id_cliente'
      })
    }
  };
  clientes.init({
    nombres: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    num_celular: {
      type: DataTypes.STRING,
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_tipo_cliente: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
      model: 'tipo_clientes',
      key: 'id'
      }
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
    modelName: 'clientes',
  });
  return clientes;
};