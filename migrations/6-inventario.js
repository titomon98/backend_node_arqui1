'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('inventarios', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            NombreProducto: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Cantidad: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            precioProducto: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            DescricionProducto: {
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
        await queryInterface.dropTable('inventarios');
    }
};