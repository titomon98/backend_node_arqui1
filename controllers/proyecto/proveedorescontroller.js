'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Proveedores = db.proveedores;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Proveedores.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto

            //falta agregar la relacion entre tablas
            nombre: datos.nombre,
            telefono: datos.telefono,
            direccion: datos.direccion,
            correo: datos.correo,
        };

        Proveedores.create(datos_ingreso)
        .then(proveedores => {
            res.send(proveedores);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },


    update (req, res) {
        //Actualizar
        let datos = req.body
          Proveedores.update(
            { //En crudo
              //falta agregar la relacion entre tablas
              nombre: datos.nombre,
                telefono: datos.telefono,
                direccion: datos.direccion,
                correo: datos.correo,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(proveedores => res.status(200).send('El registro ha sido actualizado'))
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
          const proveedores = await Proveedores.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!proveedores) {
            return res.status(404).json({ error: 'Proveedores no encontrado' });
          }
          //Si pasa este punto
          await proveedores.destroy();
          return res.json({ message: 'Proveedores eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar proveedores:', error);
          return res.status(500).json({ error: 'Error al eliminar proveedores' });
        }
    },
};