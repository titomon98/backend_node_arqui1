'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const TIPOCLIENTE = db.tipo_clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return TIPOCLIENTE.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
        },

    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            tipocliente: datos.tipocliente,
            descuento: datos.descuento,
        };

        TIPOCLIENTE.create(datos_ingreso)
        .then(tipo_clientes => {
            res.send(tipo_clientes);
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
        TIPOCLIENTE.update(
            { //En crudo
                tipocliente: datos.tipocliente,
                descuento: datos.descuento,
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

    //delete
    async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
          const carros = await TIPOCLIENTE.findByPk(id);
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