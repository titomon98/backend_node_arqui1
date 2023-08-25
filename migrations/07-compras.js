'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('compras', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fecha_compra: {
                type: Sequelize.DATE,
                allowNull: false
            },
            total: {
                type: Sequelize.FLOAT,
                allowNull: false
            }, 
            createdAt:{
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt:{
                allowNull: false,
                type: Sequelize.DATE
            },
            id_proveedores: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'proveedores',
                    key: 'id'
                }
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('compras');
    }
}