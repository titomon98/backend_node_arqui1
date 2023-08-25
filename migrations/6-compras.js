'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      fecha_compra: {
        type: Sequelize.DATE,
        allowNull: false,
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        total: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proveedor_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'proveedores',
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
    await queryInterface.dropTable('compras');
  }
};