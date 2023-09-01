'use strict';   
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('compras', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idProveedor: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'proveedores',
                    key: 'id'
                }
            },
            fecha: {
                type: Sequelize.DATE,
                allowNull: false
            },
            total: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Descuento: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            CantidadIVA: {
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
        await queryInterface.dropTable('compras');
    }
};
