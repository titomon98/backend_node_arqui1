'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class inventarios extends Model {
        static associate(models) {
            inventarios.belongsTo(models.proveedores, {
                foreignKey: 'Id_Proveedor'
            })
            inventarios.hasMany(models.detalle_ventas, {
                foreignKey: 'Id_Producto'
            })
            inventarios.hasMany(models.detalleCompras, {
                foreignKey: 'Id_Producto'
            })
        }
    };
    inventarios.init({
        Nombre_Producto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Cantidad_Producto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Precio_Producto: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Id_Proveedor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'inventarios',
    });
    return inventarios;
}