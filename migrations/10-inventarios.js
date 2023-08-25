'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('inventarios', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Nombre_Producto: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Cantidad_Producto: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Precio_Producto: {
                type: Sequelize.DECIMAL,
                allowNull: false
            },
            Id_Proveedor: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'proveedores',
                    key: 'id'
                }
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
        await queryInterface.dropTable('inventarios');
    }
};