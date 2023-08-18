'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('medicamentos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            NombreMedicamento: {
                type: Sequelize.STRING,
                allowNull: false
            },
            PrecioMedicamento: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Cantidad: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Estado: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('medicamentos');
    }
};
