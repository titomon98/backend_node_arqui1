'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ventas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pertenece_a: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      direccion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo_factura: {
        type: Sequelize.STRING,
      },
      descuento: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ventas');
  }
};