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
            Id_Cliente: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'clientes',
                    key: 'id'
                }
            },
            Fecha: {
                type: Sequelize.DATE,
                allowNull: false
            },
            Total_Venta: {
                type: Sequelize.DECIMAL,
                allowNull: false
            },
            Descuento_Aplicado: {
                type: Sequelize.DECIMAL,
                allowNull: false
            },
            IVA_Venta: {
                type: Sequelize.DECIMAL,
                allowNull: false
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
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ventas');
    }
};