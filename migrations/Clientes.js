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
      nombres: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellidos: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      num_celular: {
        type: Sequelize.STRING,
        allowNull: true
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      id_tipo_cliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
        model: 'tipo_clientes',
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
      }, //este no se cambia
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, //estos no se cambian
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clientes');
  }
};