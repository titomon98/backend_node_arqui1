'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Persona = db.personas;
const Puesto = db.puestos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    findPuestos (req, res) {
        return Puesto.findAndCountAll({
            attributes: ['nombre', 'inicio', 'fin'],
            include: { //inclusion del modelo padre
                model: Persona, //Consulta al modelo padre en base al modelo hijo
                attributes: ['nombre', 'nacimiento']
            }
          }) //Le hacemos una consulta al modelo
        .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
        .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    },
};

