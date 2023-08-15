'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      nombre: {
        type: Sequelize.DATE,
        allowNull: false
      },
      apellido: {
          type: Sequelize.STRING,
          allowNull: false
      },
      fecha_nacimiento:{
          type: Sequelize.DATE,
          allowNull: false
      },
      telefono:{
          type: Sequelize.STRING,
          allowNull: false
      },
      direccion:{
          type: Sequelize.STRING,
          allowNull: false
      },
      email:{
          type: Sequelize.STRING,
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
    await queryInterface.dropTable('clientes');
  }
};