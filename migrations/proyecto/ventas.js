'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ventas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      fecha_venta: {
        type: Sequelize.DATE,
        allowNull: false
      },
      total_venta: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      descuento_aplicado: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      monto_iva: {
          type: Sequelize.INTEGER,
          allowNull: false
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
    await queryInterface.dropTable('ventas');
  }
};