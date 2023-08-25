'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const COMPRA = db.compras;
const DETALLECOMPRA = db.detalle_compras;
const INVENTARIO = db.inventarios;
const PROVEEDOR = db.proveedores;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return COMPRA.findAll()
        .then(compras => res.status(200).send(compras))
        .catch(error => res.status(400).send(error))
    },
    findById (req, res) {
        let id = req.body.id
        return COMPRA.findByPk(id)
        .then(compras => res.status(200).send(compras))
        .catch(error => res.status(400).send(error))
    },

    //create
    async create (req, res) {
        const id_proveedor = req.body.id_proveedor;
        const productos = req.body.productos;

        let totalCompra = 0;

        const proveedor = await PROVEEDOR.findByPk(id_proveedor);
        if (!proveedor) {
            return res.status(404).send({ message: 'Proveedor no encontrado' });
        }

        for(const productoCompra of productos) {
            const producto = await INVENTARIO.findByPk(productoCompra.id);
            totalCompra = totalCompra + productoCompra.total;
            console.log(producto.id);productos.id
            if(productoCompra.id != productos.id){
                await INVENTARIO.update(
                    {
                        cantidad: producto.cantidad + productoCompra.cantidad
                    },
                    {
                        where : {
                            id: producto.id
                        }
                    }
                )
            }
        }
    }
};