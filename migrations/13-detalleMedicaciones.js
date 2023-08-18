'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('detallesMedicaciones', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idMedicamento: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'medicamentos',
                    key: 'id'
                }
            },
            idPresentacion: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'presentaciones',
                    key: 'id'
                }
            },
            DescripcionMedicamento: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Estado: {
                type: Sequelize.INTEGER,
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
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('detallesMedicaciones');
    }
};
