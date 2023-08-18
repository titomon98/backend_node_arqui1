//migración de la tabla detallemedico
// Versión: 0.1.0
// Fecha: 2021-10-13
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('detallemedico', {
            id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
            }, //esto tampoco cambia
            cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
            },
            fecha: {
            type: Sequelize.DATE,
            allowNull: false
            },
            id_presentacion: {
            type: Sequelize.INTEGER,
            allowNull: false
            },
            id_medicamento: {
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
        await queryInterface.dropTable('detallemedico');
    }
};