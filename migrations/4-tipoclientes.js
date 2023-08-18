'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tipo_cliente', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tipocliente: {
                type: Sequelize.STRING,
                allowNull: false
            },
            descuento: {
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('tipo_cliente');
    }
};