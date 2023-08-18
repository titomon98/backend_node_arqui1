'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('compra', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, //esto tampoco cambia
      TotalCompra: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      IVA: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
      },
      fechaCompra: {
        type: Sequelize.DATEONLY,
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
      id_proveedor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'proveedor',
            key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('compra');
  }
};