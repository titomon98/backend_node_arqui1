'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const INVENTARIO = db.inventarios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return INVENTARIO.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },
    findById (req, res) {
      let id = req.body.id
      return INVENTARIO.findByPk(id)
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
            descripcion: datos.descripcion,
            cantidad: datos.cantidad,
            precio: datos.precio,
        };

        INVENTARIO.create(datos_ingreso)
        .then(inventarios => {
            res.send(inventarios);
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
        INVENTARIO.update(
            { //En crudo
                nombre: datos.nombre,
                descripcion: datos.descripcion,
                cantidad: datos.cantidad,
                precio: datos.precio,
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

    //delete
    async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
          const carros = await INVENTARIO.findByPk(id);
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