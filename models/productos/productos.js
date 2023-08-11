'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    static associate(models) {
      productos.hasMany(models.tienda, {
        foreignKey: 'id_productos'
      })
    }
  };
  productos.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marca: {
        type: DataTypes.STRING, //Tipo de dato de fecha y hora
        allowNull: false //no permite datos nulos
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2)
        //si no se especifica que allowNull sea falso, si permite datos nulos
    },
    descuento: {
        type: DataTypes.DECIMAL(10, 2)
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'productos',
  });
  return productos;
};