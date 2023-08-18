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
        //extraer datos de req.body
        const datos = req.body //Serializar los datos
        Productos.findByPk(datos.id_productos)//Se busca el producto, con le ID indicado
            .then(productos => {
                if (!productos) {
                    return res.status(404).json({ error: 'Producto no encontrado' });//de no encontrarlo, lanza este error
                }
                //calcular el precio y subtotal
                const precio = productos.precio;
                const total= precio * datos.cantidad;
                const iva = total * 0.12;
                const subtotal = total+iva;
                //creo el objeto
                const datos_ingreso = { //Objeto
                    id_ventas: datos.id_ventas,
                    id_productos: datos.id_productos,
                    cantidad: datos.cantidad,
                    precio: precio,
                    total: total,
                    subtotal: subtotal,
                    iva:iva
                };
                Clientes.findByPk(datos.id_clientes, {//se busca el cliente que realizara esta compra
                    include: Tipo_clientes//se ereda el tipo de cliente, para posteriormente encontrar el desceunto
                })
                    .then(cliente => {
                        if (!cliente) {
                            return res.status(404).json({ error: 'Cliente no encontrado' });//de no haber encontrado el cliente, tira este error
                        }
                        // Calcular descuento basado en el tipo de cliente
                        const descuento = cliente.tipo_cliente.descuento; 
                        const totalConDescuento = subtotal  * (1 - descuento);
                        //se busca una venta según el ID, para agregar más productos a la factura
                        Ventas.findByPk(datos.id_ventas)
                            .then(ventas => {
                                if (!ventas) {
                                    return res.status(404).json({ error: 'Venta no encontrada' });//de no encontrar una venta sale este error
                                }
                                //se le suma al total de la venta, total de producto que se le va agregar
                                const nuevoTotal = ventas.total + totalConDescuento;
                                Ventas.update({ total: nuevoTotal }, { where: { id: datos.id_ventas } })//se actualiza el dato en la tabla ventas
                                    .then(() => {
                                        //paso el objeto a la tabla
                                        Detalle_ventas.create(datos_ingreso)
                                            //si existe muestro el objeto
                                            .then(detalle_ventas => {
                                                //se resta la cantidad de productos que se estan agregando a la tabla productos
                                                const nuevaCantidad = productos.cantidad - datos.cantidad;
                                                productos.update({ cantidad: nuevaCantidad })//se actualiza
                                                    .then(() => {
                                                        res.send(detalle_ventas)
                                                    })
                                                    .catch(error => {
                                                        console.log(error);
                                                        return res.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
                                                    });
                                            })
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
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: 'Error al consultar el producto' });
            });
    },
};