'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Proveedor = db.proveedores;
const moment = require('moment');
const axios = require('axios');
const { Op } = require("sequelize");
const { create } = require('../cliente/clienteController');


module.exports = {
    find (req, res) {
        return Proveedor.findAll()
        .then(proveedor => res.status(200).send(proveedor))
        .catch(error => res.status(400).send(error))
    },

    create (req, res){
        let datos = req.body
        const datos_ingreso = {
            nombre: datos.nombre,
            nit: datos.nit,
            contacto: datos.contacto,
            direccion: datos.direccion,
            estado: 0
        }
        Proveedor.create(datos_ingreso)
        .then(proveedor => {
            res.send(proveedor);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({error: 'Error al insertar'});
        });
    }
};