'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventario extends Model {
    static associate(models) {
      inventario.hasMany(models.detalle, {
        foreignKey: 'id_inventario'
      })
    }
  };
  inventario.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2)
        //si no se especifica que allowNull sea falso, si permite datos nulos
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'inventario',
  });
  return inventario;
};