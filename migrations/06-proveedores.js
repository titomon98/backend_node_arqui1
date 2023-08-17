'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('proveedores', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nombres: {
                type: Sequelize.STRING,
                allowNull: false
            },
            contacto: {
                type: Sequelize.STRING,
                allowNull: false
            },
            direccion: {
                type: Sequelize.STRING,
                allowNull: false
            },
            telefono: {
                type: Sequelize.STRING,
                allowNull: false
            },
            correo: {
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
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('proveedores');
    }
};