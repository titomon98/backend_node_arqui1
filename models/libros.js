'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class libros extends Model {
    static associate(models) {
      libros.belongsTo(models.editoriales, {
        foreignKey: 'id_editoriales'
      })
    }
  };
  libros.init({
    autor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publicacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_editoriales: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'editoriales',
        key: 'id_editorial'
      }
    },
  }, {
    sequelize,
    modelName: 'libros',
  });
  return libros;
};