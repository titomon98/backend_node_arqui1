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
            nombreCliente: {
                type: Sequelize.STRING,
                allowNull: false
            },
            apellidoCliente: {
                type: Sequelize.STRING,
                allowNull: false
            },
            telefono: {
                type: Sequelize.STRING,
                allowNull: false
            },
            direccion: {
                type: Sequelize.STRING,
                allowNull: false
            },
            idtipoCliente: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tipoClientes',
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('clientes');
    }
};

