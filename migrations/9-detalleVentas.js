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
            Id_Venta: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'ventas',
                    key: 'id'
                }
            },
            Id_Producto: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'inventarios',
                    key: 'id'
                }
            },
            Cantidad: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Precio_Venta: {
                type: Sequelize.DECIMAL,
                allowNull: false
            },
            Subtotal_Venta: {
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
        await queryInterface.dropTable('detalle_ventas');
    }
};
