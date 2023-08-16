'use strict';
const { all } = require('axios');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipocliente extends Model {
    static associate(models) {
        // define association here
        // 1:N
      tipocliente.hasMany(models.venta, {
        foreignKey: 'id_tipocliente'
      })
    }
  };
  tipocliente.init({
    Totalcliente: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    IVA: {
        type: DataTypes.DECIMAL(10, 2)
        //si no se especifica que allowNull sea falso, si permite datos nulos
    },
    fechacliente: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    descuento: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    // id_cliente: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
  }, {
    sequelize,
    modelName: 'cliente',
  });
  return cliente;
};