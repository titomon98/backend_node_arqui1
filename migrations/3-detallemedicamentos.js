'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('detallemedicamentos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            idmedicamento: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'medicamentos',
                    key: 'id',
                },
            },
            idpresentacion: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'presentacions',
                    key: 'id',
                },
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
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('detallemedicamentos');
    }
};