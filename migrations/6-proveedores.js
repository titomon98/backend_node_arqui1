'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('proveedores', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            direccion: {
                type: Sequelize.STRING,
                allowNull: false
            },
            telefono: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('proveedores');
    }
};