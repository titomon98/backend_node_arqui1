'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Ventas = db.ventas;
const Detalle_ventas = db.detalle_ventas;
const Clientes = db.clientes;
const Tipo_clientes = db.tipo_clientes;
const Productos = db.productos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return Detalle_ventas.findAll({
            attributes: ['cantidad', 'precio', 'subtotal'],
            include: [{
                model: Ventas,
                attributes: ['fecha_venta', 'total'],
                include: {
                    model: Clientes,
                    attributes: ['nombres']
                }
            },
            {
                model: Productos,
                attributes: ['nombre', 'descripcion', 'precio'],
            },
            ]

        })
            .then(cuenta => res.status(200).send(cuenta))
            .catch(error => res.status(400).send(error))
    },
    create(req, res) {
        //Crear
        //extraer datos de req.body
        const datos = req.body //Serializar los datos
        Productos.findByPk(datos.id_productos)
            .then(productos => {
                if (!productos) {
                    return res.status(404).json({ error: 'Producto no encontrado' });
                }
                //calcular el precio y subtotal
                const precio = productos.precio;
                const subtotal = (precio * datos.cantidad);
                const iva = subtotal * 0.12;
                //creo el objeto
                const datos_ingreso = { //Objeto
                    id_ventas: datos.id_ventas,
                    id_productos: datos.id_productos,
                    cantidad: datos.cantidad,
                    precio: precio,
                    subtotal: subtotal
                };
                //-------------------------
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
                        Ventas.findByPk(datos.id_ventas)
                            .then(ventas => {
                                if (!ventas) {
                                    return res.status(404).json({ error: 'Venta no encontrada' });
                                }
                                const nuevoTotal = ventas.total + totalConDescuento;
                                Ventas.update({ total: nuevoTotal }, { where: { id: datos.id_ventas } })
                                    .then(() => {
                                        //paso el objeto a la tabla
                                        Detalle_ventas.create(datos_ingreso)
                                            //si existe muestro el objeto
                                            .then(detalle_ventas => {
                                                const nuevaCantidad = productos.cantidad - datos.cantidad;

                                                productos.update({ cantidad: nuevaCantidad })
                                                    .then(() => {
                                                        res.send(detalle_ventas)
                                                    })
                                                    .catch(error => {
                                                        console.log(error);
                                                        return res.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
                                                    });
                                            })
                                            //en caso de error muestra el mensaje
                                            .catch(error => {
                                                console.log(error)
                                                return res.status(500).json({ error: 'Error al insertar' });
                                            });
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        return res.status(500).json({ error: 'Error al actualizar el total de la venta' });
                                    })
                            })
                            .catch(error => {
                                console.log(error)
                                return res.status(500).json({ error: 'Error al actualizar total' });
                            });

                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500).json({ error: 'Error al consultar el cliente' });
                    });
                //--------------------

            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: 'Error al consultar el producto' });
            });
    },
    create2(req, res) {
        //Crear
        //extraer datos de req.body
        const datos = req.body //Serializar los datos
        Productos.findByPk(datos.id_productos)
            .then(productos => {
                if (!productos) {
                    return res.status(404).json({ error: 'Producto no encontrado' });
                }
                //calcular el precio y subtotal
                const precio = productos.precio;
                const subtotal = (precio * datos.cantidad) + (precio * datos.cantidad * 0.12)
                //creo el objeto
                const datos_ingreso = { //Objeto
                    id_ventas: datos.id_ventas,
                    id_productos: datos.id_productos,
                    cantidad: datos.cantidad,
                    precio: precio,
                    subtotal: subtotal
                };
                Ventas.findByPk(datos.id_ventas)
                    .then(ventas => {
                        if (!ventas) {
                            return res.status(404).json({ error: 'Venta no encontrada' });
                        }
                        const nuevoTotal = ventas.total + subtotal; // Cambio realizado aquí
                        const a = ventas.Clientes.Tipo_cliente.descuento;

                        //-------------
                        Ventas.update({ total: nuevoTotal }, { where: { id: datos.id_ventas } })
                            .then(() => {
                                Detalle_ventas.create(datos_ingreso)
                                    .then(detalle_ventas => {
                                        const nuevaCantidad = productos.cantidad - datos.cantidad;
                                        productos.update({ cantidad: nuevaCantidad })
                                            .then(() => {
                                                res.status(201).json({ detalle_ventas });
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
                                return res.status(500).json({ error: 'Error al actualizar el total de la venta' });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500).json({ error: 'Error al consultar la venta' });
                    });

            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: 'Error al consultar el producto' });
            });
    },
};