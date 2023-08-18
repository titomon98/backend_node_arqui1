'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const VENTAS = db.ventas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return VENTAS.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

//------------------------------------

    //create
    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            NoFactura: datos.NoFactura,
            NombreCliente: datos.NombreCliente,
            Fecha: datos.Fecha,
            Descripcion: datos.Descripcion,
            NombreProducto: datos.NombreProducto,
            Cantidad: datos.Cantidad,
            CantidadIVA: datos.CantidadIVA,       
        };

        VENTAS.create(datos_ingreso)
        .then(ventas=> {
            res.send(ventas);
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
        VENTAS.update(
            { //En crudo
                NoFactura: datos.NoFactura,
                NombreCliente: datos.NombreCliente,
                Fecha: datos.Fecha,
                Descripcion: datos.Descripcion,
                NombreProducto: datos.NombreProducto,
                Cantidad: datos.Cantidad,
                CantidadIVA: datos.CantidadIVA,     
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
            return res.status(404).json({ error: 'Ventas no encontrado' });
          }
          //Si pasa este punto
          await ventas.destroy();
          return res.json({ message: 'Ventas eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar venta:', error);
          return res.status(500).json({ error: 'Error al eliminar venta' });
        }
      }



};