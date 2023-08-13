'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tipo_clientes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            descuento: {
                type: Sequelize.FLOAT,
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
        await queryInterface.dropTable('tipo_clientes');
    }
};