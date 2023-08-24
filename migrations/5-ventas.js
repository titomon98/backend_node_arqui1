'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ventas', {
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
                allowNull: false
            },
            total: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updateAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('ventas');
    }
};