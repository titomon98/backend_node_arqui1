'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('clientes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nombres: {
                type: Sequelize.STRING,
                allowNull: false
            },
            apellidos: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nit: {
                type: Sequelize.STRING,
                allowNull: false
            },
            id_tipos_clientes:{
                allowNull: false,
                type: Sequelize.INTEGER,
                references:{
                  model: 'tipo_clientes',
                  key: 'id'
                }
              },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('clientes');
    }
}