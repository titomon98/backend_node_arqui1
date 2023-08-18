'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Compras = db.compras;
const Detalle_compras = db.detalle_compras;
const Productos = db.productos;
const Proveedores = db.proveedores;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return Compras.findAll({
            attributes: ['id', 'fecha_compra', 'total'],
            include: [
                {
                    model: Proveedores,
                    attributes: ['nombres', 'contacto', 'correo']
                },
                {
                    model: Detalle_compras,
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
    createCompra(req, res) {
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

                const datos_compra= {
                    fecha_compra: new Date(),
                    total: subtotal,
                    id_proveedores: datos.id_proveedores
                };
                //se genra la venta
                Compras.create(datos_compra)
                    .then(compras => {
                        //se crea el contructor para los detalles de la venta
                        const datos_detalle = {
                            id_compras: compras.id,
                            id_productos: datos.id_productos,
                            cantidad: datos.cantidad,
                            precio: precio,
                            total: total,
                            subtotal: subtotal,
                            iva: iva
                        };
                        //se crea los detalles de la venta
                        Detalle_compras.create(datos_detalle)
                            .then(detalles => {
                                // Restar la cantidad del producto
                                const nuevaCantidad = parseInt(producto.cantidad) + parseInt(datos.cantidad);
                                producto.update({ cantidad: nuevaCantidad })
                                    .then(() => {
                                        res.status(201).json({
                                            compra: compras,
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
                                return res.status(500).json({ error: 'Error al insertar detalle de compra' });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500).json({ error: 'Error al insertar compra' });
                    });
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: 'Error al consultar el producto' });
            });
    },
    // update(req, res) {
    //     //Actualizar
    //     let datos = req.body
    //     Ventas.update(
    //         { //En crudo
    //             fecha_venta: datos.fecha_venta,
    //             total: datos.total,
    //             id_clientes: datos.id_clientes
    //         },
    //         {
    //             where: {
    //                 id: datos.id
    //             }
    //         }
    //     )
    //         .then(ventas => res.status(200).send('El registro ha sido actualizado'))
    //         .catch(error => {
    //             console.log(error)
    //             return res.status(500).json({ error: 'Error al actualizar' });
    //         });
    // },
};