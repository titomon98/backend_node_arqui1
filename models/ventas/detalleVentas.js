'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalleVentas extends Model {
    static associate(models) {
      detalleVentas.belongsTo(models.ventas, {
        foreignKey: 'idVenta'
      });

      detalleVentas.belongsTo(models.productos, {
        foreignKey: 'idProducto'
      });
    }
  };
  detalleVentas.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cantidad: {
      type: DataTypes.INTEGER
    },
    precioUnidad: {
      type: DataTypes.DECIMAL(10, 2)
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2)
    },
    idVenta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProducto: {  // Nueva llave foránea para productos
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'detalleVentas',
  });
  return detalleVentas;
};

