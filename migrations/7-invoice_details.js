'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('invoiceDetails', {
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
            unit_price: {
                type: Sequelize.FLOAT(10, 2),
                allowNull: false
            },
            discount: {
                type: Sequelize.FLOAT(10, 2),
                allowNull: false,
                defaultValue: 0.00
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
            id_invoice_header: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'invoiceHeaders',
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
        await queryInterface.dropTable('invoiceDetails');
    }
};