'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Factura = db.facturas;
const DetalleFactura = db.detalle_facturas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Factura.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Factura.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findByDiscount (req, res) {
        return Factura.findAll({
            where: {
              descuento: {
                [Op.gt]: 0
              }
            }
          })
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    }
};

