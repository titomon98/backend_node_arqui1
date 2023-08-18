"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("facturas", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      }, 
      total: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      descuentoAplicado: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true,
      },
      ivaAplicado: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }, 
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }, 
      nitCliente: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "clientes",
          key: "nit",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("facturas");
  },
};
