'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const moment = require('moment');
const axios = require('axios');
const { Op } = require("sequelize");

const Compra = db.compras;
const DetalleCompra = db.detalleCompras;
const Producto = db.productos;
const Proveedor = db.proveedores;

module.exports = {

    async realizarCompra(req, res) {
        const id_proveedor = req.body.id_proveedor;
        const productos = req.body.productos;

        let totalV = 0;

        const proveedor = await Proveedor.findByPk(id_proveedor);

        if (!proveedor) {
            return res.status(404).send({ message: "Proveedor no encontrado" });
        }

        for (const productoCompra of productos) {
            const producto = await Producto.findByPk(productoCompra.id);
            if (!producto) {
                return res.status(404).send({
                    message: "Producto no encontrado"
                });
            }

            productoCompra.precio = producto.precio;
            productoCompra.precioTotal = Number(producto.precio) * Number(productoCompra.cantidad);
            totalV += productoCompra.precioTotal;
            await Producto.update(
                {
                    cantidad: producto.cantidad + productoCompra.cantidad,
                },
                {
                    where: {
                        id: productoCompra.id,
                    },
                }
            );
        }

        const compra = await Compra.create({
            fecha: new Date(),
            total: totalV,
            estado: 0,
            id_proveedor: proveedor.id,
        });

        for (const productoCompra of productos) {
            await DetalleCompra.create({
                cantidad: productoCompra.cantidad,
                subTotal: productoCompra.precioTotal,
                iva: productoCompra.precioTotal * 0.12,
                estado: 0,
                id_compra: compra.id,
                id_producto: productoCompra.id
            });
        }
        return res.status(200).send(compra);
    }
};
