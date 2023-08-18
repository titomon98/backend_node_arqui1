'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('clientes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nombre: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            apellido: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            direccion: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            telefono: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            id_tipocliente: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tipo_clientes',
                    key: 'id'
                }
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('clientes');
    }
};