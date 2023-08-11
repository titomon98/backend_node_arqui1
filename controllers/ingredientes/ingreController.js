'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const INGREDIENTES = db.ingredientes;
const COMIDA = db.comidas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    findIngredi (req, res) {
        return INGREDIENTES.findAndCountAll({
            attributes: ['nombreIngrediente', 'precioIngrediente', 'cantidadIngrediente'],
            include: { //inclusion del modelo padre
                model: COMIDA, //Consulta al modelo padre en base al modelo hijo
                attributes: ['nombre', 'precio']
            }
          }) //Le hacemos una consulta al modelo
        .then(cuenta => res.status(200).send(cuenta)) //Devolvemos los datos
        .catch(error => res.status(400).send(error)) //Enviamos un mensaje de error por si acaso
        }
};