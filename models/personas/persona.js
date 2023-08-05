'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personas extends Model {
    static associate(models) {
      personas.hasMany(models.puestos, {
        foreignKey: 'id_persona'
      })
    }
  };
  personas.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nacimiento: {
        type: DataTypes.DATE, //Tipo de dato de fecha y hora
        allowNull: false //no permite datos nulos
    },
    ahorros: {
        type: DataTypes.DECIMAL(10, 2)
        //si no se especifica que allowNull sea falso, si permite datos nulos
    },
    telefono: {
        type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'personas',
  });
  return personas;
};