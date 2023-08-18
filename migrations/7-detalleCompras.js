"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("detalle_compras", {
      idProducto: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "productos",
          key: "id",
          onDelete: 'CASCADE',
        },
      },
      idCompra: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "compras",
          key: "id",
          onDelete: 'CASCADE',
        },
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      precioPorUnidad: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      precioTotal: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("detalle_compras");
  },
};
