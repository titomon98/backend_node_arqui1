'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class clientTypes extends Model {
        static associate(models) {
            clientTypes.hasMany(models.clients, {
                foreignKey: 'id_client_type'
            })
        }
    }
    clientTypes.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        discount_percentage: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'clientTypes'
    });
    return clientTypes;
};