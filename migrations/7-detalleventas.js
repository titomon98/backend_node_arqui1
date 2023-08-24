'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('detalle_ventas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_venta: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'ventas',
                    key: 'id'
                }
            },
            cantidad: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            precio: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            id_inventario: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'inventarios',
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
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('detalle_ventas');
    }
};