'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('purchaseHeaders', {
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
            day: {
                type: Sequelize.DATE,
                allowNull: false
            },
            total: {
                type: Sequelize.FLOAT(10, 2),
                allowNull: false
            },
            iva: {
                type: Sequelize.FLOAT(10, 2),
                allowNull: false
            },
            id_supplier: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'suppliers',
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
        await queryInterface.dropTable('purchaseHeaders');
    }
};