//migración de la tabla medicamento
// Versión: 0.1.0
// Fecha: 2021-10-13
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('medicamento', {
            id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
            }, //esto tampoco cambia
            nombre: {
            type: Sequelize.STRING,
            allowNull: false
            },
            fechavencimiento: {
            type: Sequelize.DATE,
            allowNull: false
            },
            precio: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
            },
            stock: {
            type: Sequelize.INTEGER,
            allowNull: false
            },
            estado: {
            type: Sequelize.INTEGER,
            allowNull: false
            },
            createdAt: {
            allowNull: false,
            type: Sequelize.DATE
            }, //este no se cambia
            updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
            }, //estos no se cambian
        });
        },
        down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('medicamento');
    }   
};