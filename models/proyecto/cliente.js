'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    static associate(models) {
     //tabla se asocia con ventas y tipo clientes
      clientes.hasMany(models.ventas,{
        foreignKey: 'cliente_id'
      })
      clientes.belongsTo(models.tipos,{
        foreignKey: 'tipo_id'
      })

    }
  };
  clientes.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_nacimiento:{
        type: DataTypes.DATE,
        allowNull: false
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'clientes',
  });
  return clientes;
};