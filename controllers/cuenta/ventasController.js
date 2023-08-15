'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Ventas = db.ventas;
const Clientes = db.clientes;
const Detalle_ventas = db.detalle_ventas;
const Tipo_clientes = db.tipo_clientes;
const Productos = db.productos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return Ventas.findAll({
            attributes: ['id','fecha_venta', 'total'],
            include: [
                {
                    model: Clientes,
                    attributes: ['nombres', 'apellidos', 'nit']
                },
                {
                    model: Detalle_ventas,
                    attributes: ['cantidad', 'precio', 'subtotal']
                }
            ]
        })
            .then(cuenta => res.status(200).send(cuenta))
            .catch(error => res.status(400).send(error))
    },

    createVenta(req, res) {
        const datos = req.body;
        //para realizar esta función tube que comprender o algo asi, el como hacer una peticion anidada
        //primero tuve que llamar productos, para conecer el precio, luego tuve que anidad clientes para 
        //poder conocer el desceunto según el tipo.

        //Obtener el prducto
        Productos.findByPk(datos.id_productos)
            .then(producto => {
                if (!producto) {
                    return res.status(404).json({ error: 'Producto no encontrado' });
                }
                const precio = producto.precio;
                const subtotal = precio * datos.cantidad;
                const iva = subtotal * 0.12;
                // Obtener el cliente, pára obtener el tipo de cliente
                Clientes.findByPk(datos.id_clientes, {
                    include: Tipo_clientes
                })
                    .then(cliente => {
                        if (!cliente) {
                            return res.status(404).json({ error: 'Cliente no encontrado' });
                        }
                        // Calcular descuento basado en el tipo de cliente
                        const descuento = cliente.tipo_cliente.descuento; // Supongamos que el descuento es un valor entre 0 y 1
                        // Calcular el total con descuento
                        const totalConDescuento = (subtotal + iva) * (1 - descuento);
                        //generar constructor con los datos que iran en la venta
                        const datos_ventas = {
                            fecha_venta: new Date(),
                            total: totalConDescuento,
                            id_clientes: datos.id_clientes
                        };
                        //se genra la venta
                        Ventas.create(datos_ventas)
                            .then(venta => {
                                //se crea el contructor para los detalles de la venta
                                const datos_detalle = {
                                    id_ventas: venta.id,
                                    id_productos: datos.id_productos,
                                    cantidad: datos.cantidad,
                                    precio: precio,
                                    subtotal: subtotal
                                };
                                //se crea los detalles de la venta
                                Detalle_ventas.create(datos_detalle)
                                    .then(detalle => {
                                        res.status(201).json({
                                            venta: venta,
                                            detalle: detalle
                                        });
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        return res.status(500).json({ error: 'Error al insertar detalle de venta' });
                                    });
                            })
                            .catch(error => {
                                console.log(error);
                                return res.status(500).json({ error: 'Error al insertar venta' });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500).json({ error: 'Error al consultar el cliente' });
                    });
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: 'Error al consultar el producto' });
            });
    },
    update(req, res) {
        //Actualizar
        let datos = req.body
        Ventas.update(
            { //En crudo
                fecha_venta: datos.fecha_venta,
                total: datos.total,
                id_clientes: datos.id_clientes
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
            .then(ventas => res.status(200).send('El registro ha sido actualizado'))
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al actualizar' });
            });
    },
};