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
            Nombre_Cliente: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Apellido_Cliente: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Id_TipoCliente: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tipo_clientes',
                    key: 'id'
                }
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
    }
};