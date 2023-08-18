'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('compras', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fecha: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            total: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            IVA: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            id_proveedor: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'proveedores',
                    key: 'id'
                }
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('compras');
    }
};