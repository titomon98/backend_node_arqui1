'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('invoiceHeaders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            authorization: {
                type: Sequelize.STRING,
                allowNull: false
            },
            series: {
                type: Sequelize.STRING,
                allowNull: false
            },
            dte_number: {
                type: Sequelize.STRING,
                allowNull: false
            },
            emission_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            certification_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            total: {
                type: Sequelize.FLOAT(10, 2),
                allowNull: false
            },
            discount: {
                type: Sequelize.FLOAT(10, 2),
                allowNull: false,
                defaultValue: 0.00
            },
            iva: {
                type: Sequelize.FLOAT(10, 2),
                allowNull: false
            },
            id_client: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'clients',
                    key: 'id'
                }
            },
            id_seller: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'sellers',
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
        await queryInterface.dropTable('invoiceHeaders');
    }
};