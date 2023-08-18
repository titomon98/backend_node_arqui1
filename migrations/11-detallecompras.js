'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('detalle_compras', {
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
                allowNull: false,
            },
            precio: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            id_inventario: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'inventarios',
                    key: 'id'
                }
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('detalle_compras');
    }
};