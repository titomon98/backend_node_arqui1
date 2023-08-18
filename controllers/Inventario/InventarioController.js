'use strict';
const Sequelize = require('sequelize');
const db = require("../../models");
const INVENTARIO = db.inventarios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return INVENTARIO.findAll()
            .then(cuenta => res.status(200).send(cuenta))
            .catch(error => res.status(400).send(error))
    },

    create(req, res) {
        let datos = req.body
        const datos_ingreso = {
            NombreProducto: datos.NombreProducto,
            Cantidad: datos.Cantidad,
            precioProducto: datos.precioProducto,
            DescricionProducto: datos.DescricionProducto,
        };  
        INVENTARIO.create(datos_ingreso)
            .then(inventario => {
                res.send(inventario);
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al insertar' });
            });
    },  

    update(req, res) {
        let datos = req.body
        INVENTARIO.update({
                NombreProducto: datos.NombreProducto,
                Cantidad: datos.Cantidad,
                precioProducto: datos.precioProducto,
                DescricionProducto: datos.DescricionProducto,
            }, {
                where: {
                    id: datos.id
                }
            })
            .then(inventario => {
                res.status(200).send(inventario)
            })
            .catch(error => res.status(400).send(error))
    },  

    delete(req, res) {
        let datos = req.body
        INVENTARIO.destroy({
                where: {
                    id: datos.id
                }
            })
            .then(inventario => {
                res.status(200).send(inventario)
            })
            .catch(error => res.status(400).send(error))
    },
};