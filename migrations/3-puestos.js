'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('puestos', {
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
      inicio:{
        type: Sequelize.DATE,
        allowNull: false
      },
      fin:{
        type: Sequelize.DATE,
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
      id_persona: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'personas',
            key: 'id'
        }
      }
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('puestos');
  }
};