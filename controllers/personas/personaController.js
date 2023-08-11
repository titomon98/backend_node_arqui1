'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Persona = db.personas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");
const carros = require('../../models/carros/carros');

module.exports = {
    find (req, res) {
        return Persona.findAndCountAll({
            attributes: ['nombre', 'ahorros'],
            include: {
                model: carros, //Consulta al modelo padre en base al modelo hijo
                attributes: ['marca', 'modelo']
            }
          }) //Le hacemos una consulta al modelo
        .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
        .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },
};

