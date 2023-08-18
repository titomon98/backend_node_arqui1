'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const INVENTARIO = db.inventario;//Cambiar por el nombre del modelo
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    //Busca todos los registros
    find (req, res) {
        return INVENTARIO.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto para ingresar los datos
            nombre: datos.nombre,
            cantidad: datos.cantidad,
            precio: datos.precio,
            descripcion: datos.descripcion,
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

};