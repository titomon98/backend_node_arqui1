'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clientes', {
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
      nit: {
        type: Sequelize.STRING,
      },
      contacto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      direccion: {
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
      }, //este no se cambia
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, //estos no se cambian
      id_tipoCliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'tipoClientes',
            key: 'id'
        }
      }
    
  });
},
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clientes');
  }
};