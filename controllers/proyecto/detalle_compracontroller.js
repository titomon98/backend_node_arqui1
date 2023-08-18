'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const DetallesCompras = db.detallescompras;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return DetalleCompras.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto

            //falta agregar la relacion entre tablas
            venta_id: datos.venta_id,
            inventario_id: datos.inventario_id,
            cantidad: datos.cantidad,
            subtotal: cantidad * 15,
        };

        DetalleCompras.create(datos_ingreso)
        .then(detallecompras => {
            res.send(detallecompras);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },


    update (req, res) {
        //Actualizar
        let datos = req.body
          DetalleCompras.update(
            { //En crudo
              //falta agregar la relacion entre tablas
              venta_id: datos.venta_id,
              inventario_id: datos.inventario_id,
              cantidad: datos.cantidad,
              subtotal: cantidad * 15,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(detallecompras => res.status(200).send('El registro ha sido actualizado'))
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
          const detallecompras = await DetalleCompras.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!detallecompras) {
            return res.status(404).json({ error: 'DetalleCompras no encontrado' });
          }
          //Si pasa este punto
          await detallecompras.destroy();
          return res.json({ message: 'DetalleCompras eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar equipo:', error);
          return res.status(500).json({ error: 'Error al eliminar equipo' });
        }
    },
};