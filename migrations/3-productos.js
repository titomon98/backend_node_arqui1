"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("productos", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fabricante: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      precioVenta: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("productos");
  },
};
