'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const carro = db.carros;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");
const persona = db.personas;

module.exports = {
    // find (req, res) {
    //     return Persona.findAndCountAll({
    //         attributes: ['nombre', 'ahorros']
    //       }) //Le hacemos una consulta al modelo
    //     .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
    //     .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
    // },

    find(req, res) {
        return persona.findAndCountAll({
            attributes: ['nombre', 'licencia', 'telefono'],
            include: { //inclusion del modelo padre
                model: carro, //Consulta al modelo padre en base al modelo hijo
                attributes: ['marca', 'modelo','motor']
            }
          }) //Le hacemos una consulta al modelo
        .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
        .catch(error => res.status(400).send(error)) //Enviamos
    }
};

