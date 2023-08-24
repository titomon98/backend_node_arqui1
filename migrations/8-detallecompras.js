'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('detalle_compras', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_compra: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'compras',
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
        return queryInterface.dropTable('detalle_compras');
    }
};