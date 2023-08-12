'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('productos', {
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
            descripcion: {
                tupe: Sequelize.STRING,
                allowNull: false
            },
            precio: {
                tupe: Sequelize.STRING,
                allowNull: false
            },
            cantidad: {
                tupe: Sequelize.INTEGER,
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
        await queryInterface.dropTable('productos');
    }
}