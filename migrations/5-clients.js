'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('clients', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            business_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            tax_identification: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                defaultValue: 'CF'
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'Ciudad'
            },
            id_client_type: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'clientTypes',
                    key: 'id'
                }
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
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
        await queryInterface.dropTable('clients');
    }
};