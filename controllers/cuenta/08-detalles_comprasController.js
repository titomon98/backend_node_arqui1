'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Compras = db.compras;
const Detalle_compras = db.detalle_compras;
const Proveedores = db.proveedores;
const Productos = db.productos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return Detalle_compras.findAll({

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
                const total = precio * datos.cantidad;
                const iva = total * 0.12;
                const subtotal = total + iva;
                //creo el objeto
                const datos_ingreso = { //Objeto
                    id_compras: datos.id_compras,
                    id_productos: datos.id_productos,
                    cantidad: datos.cantidad,
                    precio: precio,
                    total: total,
                    subtotal: subtotal,
                    iva: iva
                };
                Compras.findByPk(datos.id_compras)
                    .then(compras => {
                        if (!compras) {
                            return res.status(404).json({ error: 'Venta no encontrada' });//de no encontrar una compra sale este error
                        }
                        //se le suma al total de la compras, total de producto que se le va agregar
                        const nuevoTotal = compras.total + subtotal;
                        Compras.update({ total: nuevoTotal }, { where: { id: datos.id_compras } })//se actualiza el dato en la tabla compras
                            .then(() => {
                                //paso el objeto a la tabla
                                Detalle_compras.create(datos_ingreso)
                                    //si existe muestro el objeto
                                    .then(detalle_compras => {
                                        //se resta la cantidad de productos que se estan agregando a la tabla productos
                                        const nuevaCantidad = parseInt(productos.cantidad) + parseInt(datos.cantidad);
                                        productos.update({ cantidad: nuevaCantidad })//se actualiza
                                            .then(() => {
                                                res.send(detalle_compras)
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                return res.status(500).json({ error: 'Error al actualizar la cantidad del producto'});
                                            });
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        return res.status(500).json({ error: 'Error al insertar' });
                                    });
                            })
                            .catch(error => {
                                console.log(error);
                                return res.status(500).json({ error: 'Error al actualizar el total de la compra'});
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        return res.status(500).json({ error: 'Error al actualizar total'});
                    });
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: 'Error al consultar el producto' });
            });
    },
};