'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detalleVentas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, //esto tampoco cambia
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      subTotal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      iva: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_venta: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'ventas',
            key: 'id'
        }
      },
      id_producto: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'productos',
            key: 'id'
        }
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
    await queryInterface.dropTable('detalleVentas');
  }
};