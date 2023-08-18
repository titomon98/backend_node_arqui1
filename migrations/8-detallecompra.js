'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detallescompras', {
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
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
        },

        inventario_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'inventarios',
                key: 'id'
            }
        },
        compra_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'compras',
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
    await queryInterface.dropTable('detallescompras');
  }
};