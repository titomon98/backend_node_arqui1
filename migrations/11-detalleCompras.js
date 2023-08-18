'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('detalleCompras', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idCompra: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'compras',
                    key: 'id'
                }
            },
            idinventario: {
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
        await queryInterface.dropTable('detalleCompras');
    }
};
