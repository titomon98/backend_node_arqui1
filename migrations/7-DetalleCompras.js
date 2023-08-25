'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detalleCompras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, //esto tampoco cambia
      id_compra: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
        model: 'Compras',
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
    await queryInterface.dropTable('detalleCompras');
  }
};