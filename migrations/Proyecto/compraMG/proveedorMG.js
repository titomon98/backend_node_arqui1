'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('proveedor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, //esto tampoco cambia
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      estado: {
          type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('proveedor');
  }
};