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
            total: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            id_clientes:{
                allowNull: false,
                type: Sequelize.INTEGER,
                references:{
                  model: 'clientes',
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
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ventas');
    }
}