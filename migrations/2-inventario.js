'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventarios', {
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
      cantidad: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      precio: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      descripcion: {
          type: Sequelize.STRING,
          allowNull: false
      },
      fecha_vencimiento: {
          type: Sequelize.DATE,
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
    await queryInterface.dropTable('inventarios');
  }
};