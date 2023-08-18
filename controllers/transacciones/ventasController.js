'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const VENTAS = db.ventas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Factura.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },


    findByDiscount (req, res) {
        return Factura.findAll({
            where: {
              descuento: {
                [Op.gt]: 0 //Estas condiciones pueden encontrarlas en la documentacion
              }
            }
          })
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    } //Consulta para los que tengan un descuento mayor a 0
};