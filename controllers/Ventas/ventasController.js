'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const VENTA = db.ventas;
const DETALLEVENTA = db.detalle_ventas;
const INVENTARIO = db.inventarios;
const CLIENTE = db.clientes;
const TIPOCLIENTE = db.tipo_clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");
const tipocliente = require('../../models/cliente/tipocliente');

module.exports = {
    find (req, res) {
        return VENTA.findAll()
        .then(ventas => res.status(200).send(ventas))
        .catch(error => res.status(400).send(error))
    },
    findById (req, res) {
        let id = req.body.id
        return VENTA.findByPk(id)
        .then(ventas => res.status(200).send(ventas))
        .catch(error => res.status(400).send(error))
    },

    //create
    async create (req, res) {
        const id_cliente = req.body.id_cliente;
        const productos = req.body.productos;

        let totalVenta = 0;
        let descuentoAplicado = 0;
        let descuentoCliente = 0;

        const cliente = await CLIENTE.findByPk(id_cliente);
        if (!cliente) {
            return res.status(404).send({ message: 'Cliente no encontrado' });
        }

        for(const productoVenta of productos) {
            const producto = await INVENTARIO.findByPk(productoVenta.id);
            if (!producto) {
                return res.status(404).send({ message: 'Producto no encontrado' });
            }
            if(productoVenta.cantidad > producto.cantidad) {
                return res.status(404).send({ message: 'Stock insuficiente' });
            }
            productoVenta.precio = producto.precio;
            productoVenta.total = producto.precio * productoVenta.cantidad;
            totalVenta = totalVenta + productoVenta.total;
            await INVENTARIO.update(
                {
                    cantidad: producto.cantidad - productoVenta.cantidad
                },
                {
                    where : {
                        id: producto.id
                    }
                }
            )
        }
        console.log(cliente.id_tipocliente);
        const clienteTipo = await TIPOCLIENTE.findByPk(cliente.id_tipocliente);
        if (!clienteTipo) {
            return res.status(404).send({ message: 'Tipo de cliente no encontrado' });
        }
        if(clienteTipo.descuento > 0) {
            descuentoCliente = tipocliente.descuento;
            descuentoAplicado = totalVenta * (descuentoCliente / 100);
        }
        totalVenta = totalVenta - descuentoAplicado;
        const venta = await VENTA.create({
            id_cliente: id_cliente,
            fecha: new Date(),
            total: totalVenta,
            iva: totalVenta * 0.12,
        });
        for(const productoVenta of productos) {
            await DETALLEVENTA.create({
                id_venta: venta.id,
                cantidad: productoVenta.cantidad,
                precio: productoVenta.precio,
                id_inventario: productoVenta.id,
            })
        }
    }
};