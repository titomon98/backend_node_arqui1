'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const moment = require('moment');
const axios = require('axios');
const { Op } = require("sequelize");

const Venta = db.ventas;
const DetalleVenta = db.detalleVentas;
const Producto = db.productos;
const Cliente = db.clientes;
const TipoCliente = db.tipoClientes;

module.exports = {

    async realizarVenta(req, res) {
        const id_cliente = req.body.id_cliente;
        const productos = req.body.productos;

        let totalV = 0;
        let descuentoAplicado = 0;
        let descuentoCliente = 0;

        const cliente = await Cliente.findByPk(id_cliente);

        if (!cliente) {
            return res.status(404).send({ message: "Cliente no encontrado" });
        }

        for (const productoVenta of productos) {
            const producto = await Producto.findByPk(productoVenta.id);
            if (!producto) {
                return res.status(404).send({
                    message: "Producto no encontrado"
                });
            }
            if (Producto.cantidad <= 0) {
                return res.status(404).send({
                    message: "Producto no disponible",
                });
            }

            productoVenta.precio = producto.precio;
            productoVenta.precioTotal = Number(producto.precio) * Number(productoVenta.cantidad);
            console.log(productoVenta)
            totalV += productoVenta.precioTotal;
            console.log(totalV)
            await Producto.update(
                {
                    cantidad: producto.cantidad - productoVenta.cantidad,
                },
                {
                    where: {
                        id: productoVenta.id,
                    },
                }
            );
        }

        const tipoCliente = await TipoCliente.findByPk(cliente.id_tipoCliente);
        if (tipoCliente.descuento > 0) {
            descuentoCliente = tipoCliente.descuento;
            descuentoAplicado = totalV * descuentoCliente;
        }
        totalV -= descuentoAplicado;
        console.log(totalV);
        const venta = await Venta.create({
            fecha: new Date(),
            total: totalV,
            estado: 0,
            id_cliente: cliente.id,
        });

        for (const productoVenta of productos) {
            await DetalleVenta.create({
                cantidad: productoVenta.cantidad,
                subTotal: productoVenta.precioTotal,
                iva: productoVenta.precioTotal * 0.12,
                estado: 0,
                id_venta: venta.id,
                id_producto: productoVenta.id
            });
        }
        return res.status(200).send(venta);
    }
};

function exist(cantidad, compra) {
    return (cantidad - compra) >= 0;
}