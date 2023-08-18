//migración de la tabla presentacion
// Versión: 0.1.0
// Fecha: 2021-10-13
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('presentacion', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        }, //esto tampoco cambia
        tipopresentacion: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        }, //este no se cambia
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }, //estos no se cambian
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('presentacion');
    }
};