'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tienda', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, //esto tampoco cambia
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lugar: {
        type: Sequelize.STRING, //Tipo de dato de fecha y hora
        allowNull: false //no permite datos nulos
        },
        telefono: {
            type: Sequelize.STRING, //Tipo de dato de fecha y hora
            allowNull: false //no permite datos nulos
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, //este no se cambia
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, //estos no se cambian
      id_productos: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'productos',
            key: 'id'
        }
      }
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tienda');
  }
};