'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, //esto tampoco cambia
      id_producto: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
        model: 'Productos',
        key: 'id'
        }
      },
      cantidad: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('compras');
  }
};