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
            nombre: {
                tupe: Sequelize.STRING,
                allowNull: false
            },
            direccion: {
                tupe: Sequelize.STRING,
                allowNull: false
            },
            telefono: {
                tupe: Sequelize.STRING,
                allowNull: false
            },
            correo: {
                tupe: Sequelize.STRING,
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
}