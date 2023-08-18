'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Inventarios', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            //Definir los campos del modelo
            //Aqui no generamos id, esto va en la migracion
            nombre: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cantidad: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            precio: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            descripcion: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Inventarios');
    }
};