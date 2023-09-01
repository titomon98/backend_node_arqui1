'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('detalleVentas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idVenta: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'ventas',
                    key: 'id'
                }
            },
            idInventario: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'inventarios',
                    key: 'id'
                }
            },
            cantidad: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Subtotal: {
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
        await queryInterface.dropTable('detalleVentas');
    }
};