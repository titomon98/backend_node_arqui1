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
            attributes: ['id', 'fecha_venta', 'total'],
            include: [
                {
                    model: Clientes,
                    attributes: ['nombres', 'apellidos', 'nit']
                },
                {
                    model: Detalle_ventas,
                    attributes: ['cantidad', 'precio', 'subtotal'],
                    include: {
                        model: Productos,
                        attributes: ['nombre', 'precio']
                    }
                }
            ]
        })
            .then(cuenta => res.status(200).send(cuenta))
            .catch(error => res.status(400).send(error))
    },
    findId(req, res) {
        const ID = req.params.id;
        Ventas.findByPk(ID)
            .then(ventas => {
                if (!ventas) {
                    return res.status(404).send({ error: 'Venta no encontrada' })
                }
                //res.status(200).send({ventas})
                const IDClientes = ventas.id_clientes;
                Clientes.findByPk(IDClientes)
                    .then(clientes => {
                        if (!clientes) {
                            return res.status(404).send({ error: 'cliente no encontrado' })
                        }
                        const IDTipoClientes = clientes.id_tipo_clientes;
                        Tipo_clientes.findByPk(IDTipoClientes)
                            .then(tipo_clientes => {
                                if (!tipo_clientes) {
                                    return res.status(404).send({ error: 'Tipo de cliente no encontrado' })
                                }
                                const response = {
                                    ventas: ventas,
                                    clientes: clientes,
                                    tipo_cliente: tipo_clientes
                                }
                                res.status(200).send({ response })

                            })
                            .catch(error => {
                                console.log(error);
                                return res.status(404).send({ error: 'Error al buscar el tipo de cliente' })
                            })
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(404).send({ error: 'Error al buscar cliente' })
                    })
            })
            .catch(error => {
                console.log(error);
                return res.status(404).send({ error: 'Error al buscar la venta' })
            })
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
                const total = precio * datos.cantidad;
                const iva = total * 0.12;
                const subtotal = total + iva;
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
                        const totalConDescuento = subtotal * (1 - descuento);
                        //generar constructor con los datos que iran en la venta
                        const datos_ventas = {
                            fecha_venta: new Date(),
                            total: totalConDescuento,
                            id_clientes: datos.id_clientes
                        };
                        //se genra la venta
                        Ventas.create(datos_ventas)
                            .then(ventas => {
                                //se crea el contructor para los detalles de la venta
                                const datos_detalle = {
                                    id_ventas: ventas.id,
                                    id_productos: datos.id_productos,
                                    cantidad: datos.cantidad,
                                    precio: precio,
                                    total: total,
                                    subtotal: subtotal,
                                    iva: iva
                                };
                                //se crea los detalles de la venta
                                Detalle_ventas.create(datos_detalle)
                                    .then(detalles => {
                                        // Restar la cantidad del producto
                                        const nuevaCantidad = producto.cantidad - datos.cantidad;
                                        producto.update({ cantidad: nuevaCantidad })
                                            .then(() => {
                                                res.status(201).json({
                                                    venta: ventas,
                                                    detalle: detalles
                                                });
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                return res.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
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