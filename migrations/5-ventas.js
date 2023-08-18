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
      NoFactura: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    NombreCliente: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Fecha: {
      type: Sequelize.DATE,
      allowNull: false
    },
    Decripcion: {
      type: Sequelize.STRING,
      allowNull: false
    },
    NombreProducto: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Cantidad: {
      type: Sequelize.INTEGER,
    },
    CantidadIVA: {
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