'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('compras', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fecha: {
                type: Sequelize.DATE,
                allowNull: false
            },
            total: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            IVA: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            id_proveedor: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'proveedores',
                    key: 'id'
                }
            },

            createAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updateAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('compras');
    }
};