'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const VENTAS = db.ventas;//Cambiar por el nombre del modelo
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    //Busca todos los registros
    find (req, res) {
        return VENTAS.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },
    
    
    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto para ingresar los datos
            id_cliente: datos.id_cliente,
            id_producto: datos.id_producto,
            nombre: datos.nombre,
            cantidad: datos.cantidad,
            total: datos.total,
        };

        VENTAS.create(datos_ingreso)
        .then(ventas => {
            res.send(ventas);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
    },
    //update
    /*update (req, res) {
        //Actualizar
        let datos = req.body
        VENTAS.update(
            { //En crudo
                cantidad: datos.cantidad,
                total: datos.total,
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(ventas => res.status(200).send('El registro ha sido actualizado'))
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
          const ventas = await VENTAS.findByPk(id);
          //evaluamos si el objeto trajo algo
          if (!ventas) {
            return res.status(404).json({ error: 'Producto no encontrado' });
          }
          //Si pasa este punto
          await ventas.destroy();
          return res.json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar producto:', error);
          return res.status(500).json({ error: 'Error al eliminar producto' });
        }
      }
        */
};