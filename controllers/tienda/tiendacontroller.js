'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Productos = db.productos;
const Tienda = db.tienda;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    findTienda (req, res) {
        return Tienda.findAndCountAll({
            attributes: ['nombre', 'lugar'],
            include: { //inclusion del modelo padre
                model: Productos, //Consulta al modelo padre en base al modelo hijo
                attributes: ['nombre']
            }
          }) //Le hacemos una consulta al modelo
        .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
        .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },
};

