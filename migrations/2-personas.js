'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('personas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, //esto tampoco cambia
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nacimiento:{
        type: Sequelize.DATE,
        allowNull: false
      },
      ahorros: {
        type: Sequelize.DECIMAL(10,2)
      },
      telefono: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('personas');
  }
};