'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('proveedores', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
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

            createAt : {
                allowNull: false,
                type: Sequelize.DATE
            },
            updateAt : {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('proveedores');
    }
};