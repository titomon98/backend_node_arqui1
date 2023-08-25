'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('detalle_compras', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cantidad: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            precio: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            total: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            subtotal: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            iva: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            id_compras: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'compras',
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
            id_productos: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'productos',
                    key: 'id'
                }
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('detalle_compras');
    }
};