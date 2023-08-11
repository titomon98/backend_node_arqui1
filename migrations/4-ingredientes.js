'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ingredientes', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
       nombreIngrediente: {
          type: Sequelize.STRING,
          allowNull: false
        },
        precioIngrediente: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        cantidadIngrediente: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        id_comida: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'comidas',
                key: 'id'
            }
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
    await queryInterface.dropTable('ingredientes');
  }
};