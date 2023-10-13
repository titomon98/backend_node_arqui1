//Controlador de inventario
'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Aeropuerto = db.aeropuertos;

module.exports = {
    //findAll
    find (req, res) {
        return Aeropuerto.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },
    //findById
    findById (req, res) {
        let id = req.body.id
        return Aeropuerto.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },
};
