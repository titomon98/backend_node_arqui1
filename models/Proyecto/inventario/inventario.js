'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventario extends Model {
    static associate(models) {
      // define association here
      //un inventario puede tener muchos detalles
      inventario.hasMany(models.detalle, {
        foreignKey: 'id_inventario'
      })

      //un inventario puede tener muchos detallesC
      inventario.hasMany(models.detalleC, {
        foreignKey: 'id_inventario'
      })
    }
  };
  inventario.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'inventario',
    freezeTableName: true,    // Evita la pluralización automáticamente
  });
  return inventario;
};