'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Tipo_Clientes = db.tipo_clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Tipo_Clientes.findAll({
            
        })
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },
    findId(req, res) {
        const ID = req.params.id; // Obtén el ID del registro a buscar
        Tipo_Clientes.findByPk(ID)
            .then(registro => {
                if (!registro) {
                    return res.status(404).json({ error: 'Tipo de cliente no encontrado' });
                }
                res.status(200).json({ registro });
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: 'Error al buscar el tipo de cliente' });
            });
    },    
    create (req, res) {
      //Crear
      //extraer datos de req.body
      let datos = req.body //Serializar los datos
      const datos_ingreso = { //Objeto
          nombre: datos.nombre,
          descuento: datos.descuento
      };
      Tipo_Clientes.create(datos_ingreso)
      .then(tipo_clientes => {
          res.send(tipo_clientes);
      })
      .catch(error => {
          console.log(error)
          return res.status(500).json({ error: 'Error al insertar' });
      });
    },
    update(req, res) {
        //Actualizar
        let datos = req.body
        Tipo_Clientes.update(
            { //En crudo
                nombre: datos.nombre,
                descuento: datos.descuento
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
            .then(tipo_clientes => res.status(200).send('El registro ha sido actualizado'))
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al actualizar' });
            });
    },
};