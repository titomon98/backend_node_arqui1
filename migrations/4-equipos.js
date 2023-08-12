'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('equipos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      propietario: {
          type: Sequelize.STRING,
          allowNull: false
      },
      entrenador: {
          type: Sequelize.STRING,
          allowNull: false
      },
      posicion: {
          type: Sequelize.STRING,
          allowNull: false
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
    await queryInterface.dropTable('equipos');
  }
};