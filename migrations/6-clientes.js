'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('clientes', {
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
            apellido: {
                type: Sequelize.STRING,
                allowNull: false
            },
            telefono: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            direccion: {
                type: Sequelize.STRING,
                allowNull: false
            },
            tipo_cliente: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('clientes');
    }
};