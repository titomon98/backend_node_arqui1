'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('venta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, //esto tampoco cambia
      TotalVenta: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      IVA: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
      },
      fechaVenta: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      descuento: {
          type: Sequelize.DECIMAL(10, 2),
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
      id_cliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'cliente',
            key: 'id'
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('venta');
  }
};