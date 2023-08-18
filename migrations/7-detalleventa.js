'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detalles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        },
        subtotal: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

      venta_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'ventas',
            key: 'id'
        }
      },

      inventario_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'inventarios',
            key: 'id'
        }
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
    await queryInterface.dropTable('detalles');
  }
};