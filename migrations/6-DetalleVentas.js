'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detalleventas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, //esto tampoco cambia
      id_cliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
        model: 'Clientes',
        key: 'id'
        }
      },
      id_venta: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
        model: 'Ventas',
        key: 'id'
        }
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      iva: {
        type: Sequelize.FLOAT,
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
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detalleventas');
  }
};