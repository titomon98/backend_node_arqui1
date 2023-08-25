'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Inventarios = db.inventarios;
const DetalleCliente = db.detalle_inventarios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Inventarios.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            cantidad: datos.cantidad,
            precio: cantidad * 15,
        };

        Inventarios.create(datos_ingreso)
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
          Inventarios.update(
            { //En crudo
              nombre: datos.nombre,
              descripcion: datos.descripcion,
              fecha_vencimiento: datos.fecha_vencimiento,
              cantidad: datos.cantidad,
              precio: cantidad * 15,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(inventarios => res.status(200).send('El registro ha sido actualizado'))
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
          const inventarios = await Inventarios.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!inventarios) {
            return res.status(404).json({ error: 'Inventarios no encontrado' });
          }
          //Si pasa este punto
          await inventarios.destroy();
          return res.json({ message: 'Inventarios eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar equipo:', error);
          return res.status(500).json({ error: 'Error al eliminar equipo' });
        }
    },
};