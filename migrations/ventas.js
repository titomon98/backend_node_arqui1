'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ventas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fecha_venta: {
                tupe: Sequelize.DATE,
                allowNull: false
            },
            total: {
                tupe: Sequelize.INTEGER,
                allowNull: false
            },
            id_clientess:{
                allowNull: false,
                type: Sequelize.INTEGER,
                references:{
                  model: 'ventas',
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
        await queryInterface.dropTable('ventas');
    }
}