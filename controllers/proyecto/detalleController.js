'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Detalles = db.detalles;
const DetalleDetalles = db.detalle_detalles;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Detalles.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto

            //falta agregar la relacion entre tablas
            cantidad: datos.cantidad,
            subtotal: datos.subtotal,
        };

        Detalles.create(datos_ingreso)
        .then(detalles => {
            res.send(detalles);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },


    update (req, res) {
        //Actualizar
        let datos = req.body
          Detalles.update(
            { //En crudo
              //falta agregar la relacion entre tablas
                cantidad: datos.cantidad,
                subtotal: datos.subtotal,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(detalles => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },

      async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
          const detalles = await Detalles.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!detalles) {
            return res.status(404).json({ error: 'Detalles no encontrado' });
          }
          //Si pasa este punto
          await detalles.destroy();
          return res.json({ message: 'Detalles eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar equipo:', error);
          return res.status(500).json({ error: 'Error al eliminar equipo' });
        }
    },
};