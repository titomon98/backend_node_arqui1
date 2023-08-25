//Controlador de venta
'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const venta = require('../../models/Proyecto/venta/venta');
const Venta = db.venta;
const inventario = require('../../models/Proyecto/inventario/inventario');
const Inventario = db.inventario;
const cliente = require('../../models/Proyecto/cliente/cliente');
const Cliente = db.cliente;
const tipocliente = require('../../models/Proyecto/tipocliente/tipocliente');
const Tipocliente = db.tipocliente;

module.exports = {
    //buscar todos los registros
    find (req, res) {
        return Venta.findAll()
        .then(venta => res.status(200).send(venta))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Venta.findByPk(id)
        .then(venta => res.status(200).send(venta))
        .catch(error => res.status(400).send(error))
    }, //Consulta por medio de una llave primaria

    //create de una venta
};
