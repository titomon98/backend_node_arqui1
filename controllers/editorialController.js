'use strict'
const Sequelize     = require('sequelize');
const db = require("../models");
const Editorial = db.editoriales;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Editorial.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Editorial.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre_editorial: datos.nombre,
            direccion: datos.direccion,
            numero_telefonico: datos.telefono,
            estado: 1,
        };
  
        Editorial.create(datos_ingreso)
        .then(editorial => {
            res.send(editorial);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },

      update (req, res) {
        //Actualizar
        let datos = req.body
          Editorial.update(
            { //En crudo
                nombre_editorial: datos.nombre,
                direccion: datos.direccion,
                numero_telefonico: datos.telefono,
                estado: datos.estado,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(editorial => res.status(200).send('El registro ha sido actualizado'))
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
          const editorial = await Editorial.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!editorial) {
            return res.status(404).json({ error: 'Editorial no encontrada' });
          }
          //Si pasa este punto
          await editorial.destroy(); 
          return res.json({ message: 'Editorial eliminada correctamente' });
        } catch (error) {
          console.error('Error al eliminar editorial:', error);
          return res.status(500).json({ error: 'Error al eliminar editorial' });
        }
      },
};

