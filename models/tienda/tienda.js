'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tienda extends Model {
    static associate(models) {
        tienda.belongsTo(models.productos,{
            foreignKey: 'id_productos'
          })
    }
  };
  tienda.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lugar: {
        type: DataTypes.STRING, //Tipo de dato de fecha y hora
        allowNull: false //no permite datos nulos
    },
    telefono: {
        type: DataTypes.STRING, //Tipo de dato de fecha y hora
        allowNull: false //no permite datos nulos
    },
    id_productos: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tienda',
  });
  return tienda;
};