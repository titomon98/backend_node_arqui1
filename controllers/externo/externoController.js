'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Factura = db.facturas;
const DetalleFactura = db.detalle_facturas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    async find (req, res) {
        let id = req.body.id
        const options = {
            'method': 'GET',
            'url': 'http://localhost:3000/factura/find/id',
            'headers': {
              'Content-Type': 'application/json'
            },
            data: {
                id: id
            }
          };
        
          try {
            const result = await axios(options);
            console.log(result.data);
            res.send(result.data + 'Utilizando la API de clientes')
          } catch (e) {
               console.log(e);
          }
     
    },

  };

