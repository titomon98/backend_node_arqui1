"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("clientes", {
      nit: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      }, 
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fechaNacimiento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      direccion: {
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
      idTipoCliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "tipos_clientes",
          key: "id",
          onDelete: 'CASCADE',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("clientes");
  },
};
