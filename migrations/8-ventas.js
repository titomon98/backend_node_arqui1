'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('ventas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_cliente: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'clientes',
                    key: 'id'
                }
            },
            fecha: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            total: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('ventas');
    }
};