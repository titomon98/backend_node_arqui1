//del modelo aeropuertopruebas
'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('aeropuertopruebas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, //esto tampoco cambia
      usuario: {
        type: Sequelize.STRING,
        allowNull: false
      },
      aeropuerto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    visitas: {
        type: Sequelize.INTEGER,
      allowNull: false
    },
    fecha_hora: {
        type: Sequelize.STRING,
        allowNull: false
    },
    motivo: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('aeropuertopruebas');
  }
};