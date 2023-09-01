// Migración para detalleVentas
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('detalleVentas', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        cantidad: {
          type: Sequelize.INTEGER
        },
        precioUnidad: {
          type: Sequelize.DECIMAL(10, 2)
        },
        subtotal: {
          type: Sequelize.DECIMAL(10, 2)
        },
        idVenta: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'ventas',  // Asegúrate de que el nombre de la tabla sea correcto
            key: 'id'     // Asegúrate de que la columna sea correcta
          }
        },
        idProducto: {  // Nueva llave foránea para productos
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'productos',  // Asegúrate de que el nombre de la tabla sea correcto
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
      await queryInterface.dropTable('detalleVentas');
    }
  };
  