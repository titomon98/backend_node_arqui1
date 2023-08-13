'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('detalle_ventas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_ventas: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'ventas',
                    key: 'id'
                }
            },
            id_productos: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'productos',
                    key: 'id'
                }
            },
            cantidad: {
                type: Sequelize.STRING,
                allowNull: false
            },
            precio: {
                type: Sequelize.STRING,
                allowNull: false
            },
            subtotal: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('detalle_ventas');
    }
};