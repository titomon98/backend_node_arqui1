'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('presentaciones', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            TipoPresentacion: {
                type: Sequelize.STRING,
                allowNull: false
            },
            DescripcionPresentacion: {
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
        await queryInterface.dropTable('presentaciones');
    }
};
