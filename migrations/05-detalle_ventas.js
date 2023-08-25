'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('detalle_ventas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            
            cantidad: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            precio: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            total:{
                type: Sequelize.FLOAT,
                allowNull: false
            },
            subtotal: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            iva: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            id_ventas: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'ventas',
                    key: 'id'
                }
            },
            id_productos: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'productos',
                    key: 'id'
                }
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('detalle_ventas');
    }
};