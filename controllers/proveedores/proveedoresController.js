'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const PROVEEDORES = db.proveedores;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return PROVEEDORES.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
        },

    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            direccion: datos.direccion,
            telefono: datos.telefono,
        };

        PROVEEDORES.create(datos_ingreso)
        .then(proveedores => {
            res.send(proveedores);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },

    //update
    update (req, res) {
        //Actualizar
        let datos = req.body
        PROVEEDORES.update(
            { //En crudo
                nombre: datos.nombre,
                direccion: datos.direccion,
                telefono: datos.telefono,
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

    //delete
    async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
          const carros = await PROVEEDORES.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!carros) {
            return res.status(404).json({ error: 'Producto no encontrado' });
          }
          //Si pasa este punto
          await carros.destroy();
          return res.json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar producto:', error);
          return res.status(500).json({ error: 'Error al eliminar producto' });
        }
    },
};