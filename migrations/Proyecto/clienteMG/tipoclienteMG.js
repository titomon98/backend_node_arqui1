'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tipocliente', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, //esto tampoco cambia
      normal: {
        type: Sequelize.INTENGER ,
        allowNull: false
      },
      frecuente: {
        type: Sequelize.INTENGER ,
        allowNull: false
      },
      mayorista: {
        type: Sequelize.INTENGER ,
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
    await queryInterface.dropTable('cliente');
  }
};