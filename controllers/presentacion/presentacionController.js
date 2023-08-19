//controlador de presentacion
'use strict';
const db = require("../../models");
const Presentacion = db.presentacion;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    //find all
    find (req, res) {
        return Presentacion.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },
    //find by id
    findById (req, res) {
        let id = req.body.id
        return Presentacion.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    }, //Consulta por medio de una llave primaria*/
    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            tipopresentacion: datos.tipopresentacion,
        };

        Presentacion.create(datos_ingreso)
        .then(presentacion => {
            res.send(presentacion);
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
          Producto.update(
            { //En crudo
                tipopresentacion: datos.tipopresentacion,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(presentacion => res.status(200).send('El registro ha sido actualizado'))
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
          const presentacion = await Presentacion.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!presentacion) {
            return res.status(404).json({ error: 'Presentacion no encontrado' });
          }
          //Si pasa este punto
          await presentacion.destroy();
          return res.json({ message: 'Presentacion eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar producto:', error);
          return res.status(500).json({ error: 'Error al eliminar producto' });
        }
      }
};