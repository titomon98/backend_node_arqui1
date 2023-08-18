'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('clientes', {
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
            apellido: {
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
            id_tipocliente: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tipo_clientes',
                    key: 'id'
                }
            },
            createAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updateAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('clientes');
    }
};