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
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      descuento: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      iva: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      idCliente: {  // Nueva llave foránea para productos
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',  // Asegúrate de que el nombre de la tabla sea correcto
          key: 'id'     // Asegúrate de que la columna sea correcta
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ventas');
  }
};
