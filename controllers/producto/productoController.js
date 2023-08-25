'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Producto = db.productos;
const moment = require('moment');
const axios = require('axios');
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Producto.findAll()
        .then (producto => res.status(200).send(producto))
        .catch (error => res.status(400).send(error))
    },

    create (req, res) {
        let datos = req.body
        const datos_ingreso = {
            nombre: datos.nombre,
            precio: datos.precio,
            cantidad: datos.cantidad,
            estado: 0
        };

        Producto.create(datos_ingreso)
        .then(producto => {
            res.send(producto);
        })
        .catch (error => {
            console.log(error)
            return res.status(500).json({error: 'Error al insertar'});
        })
    }
};