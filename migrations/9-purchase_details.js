'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('purchaseDetails', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            amount: {
                type: Sequelize.INTEGER,
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
            id_product: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id'
                }
            },
            id_purchase_header: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'purchaseHeaders',
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
        await queryInterface.dropTable('purchaseDetails');
    }
};