'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('inventarios', {
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
            descripcion: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cantidad: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            precio: {
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
        return queryInterface.dropTable('inventarios');
    }
};