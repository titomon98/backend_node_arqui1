'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ligas', {
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
      posición: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
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

      id_equipo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'equipos',
            key: 'id'
        }
      }

    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ligas');
  }
};