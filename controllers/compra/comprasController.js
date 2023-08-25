'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const COMPRAS = db.compras;
const DETALLECOMPRAS = db.detalleCompras;
const INVENTARIOS = db.inventarios;
const PROVEEDORES = db.proveedores;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return COMPRAS.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error));
    },


    async create (req, res) {
        const idProveedor = req.body.Id_Proveedor;
        const productos = req.body.productos;

        let totalCompras = 0;

        const proveedores = await PROVEEDORES.findByPk(idProveedor);
     
        if (!proveedores) {
            return res.status(404).send({message: 'El proveedor no se ha encontrado'});   
        }
        for(const productoCompra of productos){
            const producto = await INVENTARIOS.findByPk(productoCompra.id);
            console.log(totalCompras);
            if(productoCompra.id != productos.id){              
                productoCompra.Precio = producto.Precio_Producto;
                productoCompra.total = producto.Precio_Producto * productoCompra.Cantidad_Producto;
                totalCompras = totalCompras + productoCompra.total;
                await INVENTARIOS.update(
                    {
                        Cantidad_Producto: producto.Cantidad_Producto + productoCompra.Cantidad_Producto
                    },
                    {
                        where: {
                            id: producto.id
                        }
                    }
                )
                }    
        }

        const compra = await COMPRAS.create({
            Fecha_Compra: new Date(),
            IVA_Compra: totalCompras * 0.12
        });    

        for (const productoCompra of productos) {
            await DETALLECOMPRAS.create({
                Id_Compra: compra.id,
                Id_Producto: productoCompra.id,
                Cantidad_Producto: productoCompra.Cantidad_Producto,
                Precio_Compra: productoCompra.Precio,
                Subtotal_Compra: productoCompra.total
            })
        }
}
};