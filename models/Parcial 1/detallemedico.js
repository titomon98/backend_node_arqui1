// Versión: 0.1.0
// Fecha: 2021-10-13
// Comentario: modelo de la tabla detallemedico
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detallemedico extends Model {
    static associate(models) {
      // define association here
        // 1 detalle pertenece a 1 medicamento
        detallemedico.belongsTo(models.medicamento,{
            foreignKey: 'id_medicamento'
          })
      // 1 detalle pertenece a 1 presentacion
      detallemedico.belongsTo(models.presentacion,{
        foreignKey: 'id_presentacion'
      })
    }
  };
  detallemedico.init({
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_presetancion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_medicamento: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
  }, {
    sequelize,
    modelName: 'detallemedico',
  });
  return detallemedico;
};